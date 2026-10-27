import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { enquirySchema } from "@/lib/validation";
import { brand } from "@/data/brand";

export const runtime = "nodejs";

/**
 * In-memory rate limit. Good for a single instance / preview deployment.
 * For multi-region production, move this to Redis or your form provider.
 */
const buckets = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 500) {
    for (const [k, v] of buckets) {
      if (v.every((stamp) => now - stamp > WINDOW_MS)) buckets.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

/** Simple duplicate guard for retries with the same key. */
const seenKeys = new Map<string, number>();

function seenRecently(key: string | undefined) {
  if (!key) return false;
  const now = Date.now();
  for (const [k, stamp] of seenKeys) {
    if (now - stamp > 30 * 60 * 1000) seenKeys.delete(k);
  }
  return seenKeys.has(key);
}

function remember(key: string | undefined) {
  if (!key) return;
  const now = Date.now();
  if (seenKeys.size > 300) {
    for (const [k, stamp] of seenKeys) {
      if (now - stamp > 30 * 60 * 1000) seenKeys.delete(k);
    }
  }
  seenKeys.set(key, now);
}

async function deliver(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}): Promise<"email" | "smtp" | "webhook" | "file" | "none"> {
  const text = [
    `New SOSIAL enquiry`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    `Company: ${payload.company || "-"}`,
    `Service: ${payload.service}`,
    `Budget: ${payload.budget || "-"}`,
    ``,
    `Message:`,
    payload.message,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (resendKey && to && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `SOSIAL enquiry: ${payload.name} — ${payload.service}`,
        text,
      }),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Resend rejected the message (${response.status}). ${detail.slice(0, 200)}`);
    }
    return "email";
  }

  // Gmail SMTP (or any SMTP provider) is the quickest production path when
  // the studio already has a mailbox and a Google app password.
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
    const password = host.includes("gmail.com") ? smtpPass.replace(/\s+/g, "") : smtpPass;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user: smtpUser, pass: password },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    await transporter.sendMail({
      from: from || `SOSIAL <${smtpUser}>`,
      to: to || brand.email,
      replyTo: payload.email,
      subject: `SOSIAL enquiry: ${payload.name} — ${payload.service}`,
      text,
    });
    return "smtp";
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "sosial-website", ...payload }),
    });
    if (!response.ok) {
      throw new Error(`Enquiry webhook failed with status ${response.status}.`);
    }
    return "webhook";
  }

  // Local preview sink. This genuinely stores the enquiry on disk, so the
  // visitor is not told "sent" when nothing happened. It is development-only
  // by default; production must opt in explicitly.
  const fileSinkEnabled =
    process.env.ENQUIRY_FILE_SINK === "on" ||
    (process.env.NODE_ENV !== "production" && process.env.ENQUIRY_FILE_SINK !== "off");
  if (fileSinkEnabled) {
    const dir = path.join(process.cwd(), ".data", "enquiries");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`);
    await writeFile(file, JSON.stringify({ receivedAt: new Date().toISOString(), ...payload }, null, 2), "utf8");
    return "file";
  }

  return "none";
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported request format." }, { status: 415 });
  }

  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > 20_000) {
    return NextResponse.json({ ok: false, error: "That message is too large." }, { status: 413 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this connection. Please try again later or email us directly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Could not read that request." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const idempotencyKey = typeof raw.idempotencyKey === "string" ? raw.idempotencyKey : undefined;
  if (seenRecently(idempotencyKey)) {
    return NextResponse.json({ ok: true, delivered: "duplicate" });
  }

  // Honeypot and time trap: silently accept so bots do not learn the rules.
  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return NextResponse.json({ ok: true, delivered: "ignored" });
  }
  if (typeof raw.startedAt === "number" && Date.now() - raw.startedAt < 1500) {
    return NextResponse.json({ ok: true, delivered: "ignored" });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form and try again." },
      { status: 422 },
    );
  }

  const values = parsed.data;

  try {
    const channel = await deliver({
      name: values.name,
      email: values.email,
      phone: values.phone || undefined,
      company: values.company || undefined,
      service: values.service,
      budget: values.budget || undefined,
      message: values.message,
    });

    if (channel === "none") {
      return NextResponse.json(
        {
          ok: false,
          error: `Email delivery is not configured yet. Please write to ${brand.email} and we will reply directly.`,
          code: "not-configured",
        },
        { status: 503 },
      );
    }

    remember(idempotencyKey);
    console.info(`[enquiry] delivered=${channel} service=${values.service}`);
    return NextResponse.json({ ok: true, delivered: channel });
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: `We could not deliver your enquiry. Please email ${brand.email} and we will pick it up there.`,
        code: "delivery-failed",
      },
      { status: 502 },
    );
  }
}
