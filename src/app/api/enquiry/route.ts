import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
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
function duplicate(key: string | undefined) {
  if (!key) return false;
  const now = Date.now();
  if (seenKeys.size > 300) {
    for (const [k, stamp] of seenKeys) if (now - stamp > 30 * 60 * 1000) seenKeys.delete(k);
  }
  const existing = seenKeys.get(key);
  if (existing && now - existing < 30 * 60 * 1000) return true;
  seenKeys.set(key, now);
  return false;
}

async function deliver(payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}): Promise<"email" | "webhook" | "file" | "none"> {
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
  // visitor is not told "sent" when nothing happened.
  if (process.env.ENQUIRY_FILE_SINK !== "off") {
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
  if (duplicate(idempotencyKey)) {
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
