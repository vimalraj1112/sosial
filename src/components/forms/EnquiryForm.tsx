"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, ArrowUpRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { brand, mailHref } from "@/data/brand";
import { budgetOptions, enquirySchema, serviceInterestOptions, type EnquiryValues } from "@/lib/validation";
import { Field, inputBase, inputOnDark } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

function createKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

type Props = {
  variant?: "compact" | "full";
  tone?: "light" | "dark";
  className?: string;
};

export function EnquiryForm({ variant = "full", tone = "dark", className }: Props) {
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const startedAt = useRef(0);
  const idempotencyKey = useRef("");

  // Timing and idempotency values are client-only; initialise after mount so
  // render stays pure and server/client markup matches.
  useEffect(() => {
    startedAt.current = Date.now();
    idempotencyKey.current = createKey();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const dark = tone === "dark";
  const inputClass = dark ? inputOnDark : inputBase;
  const id = (name: string) => `${uid}-${name}`;

  const onSubmit = async (values: EnquiryValues) => {
    setFailure(null);
    // Runs from the submit event, never during render.
    // eslint-disable-next-line react-hooks/purity
    const started = startedAt.current || Date.now();
    const key = idempotencyKey.current || createKey();
    idempotencyKey.current = key;
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startedAt: started,
          idempotencyKey: key,
        }),
        cache: "no-store",
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; delivered?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setFailure(
          data?.error ??
            `We could not send your enquiry. Please email us directly at ${brand.email}.`,
        );
        return;
      }

      setSent(true);
      reset();
      idempotencyKey.current = createKey();
    } catch {
      setFailure(
        `Your message did not send, most likely a connection issue. Please try again or email ${brand.email}.`,
      );
    }
  };

  if (sent) {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 rounded-2xl border-2 p-7",
          dark ? "border-paper/25 bg-night-soft" : "border-ink/15 bg-card",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-coral text-white shadow-[2px_2px_0_0_var(--color-ink)]">
          <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <h3 className={cn("font-display text-xl font-semibold tracking-[-0.02em]", dark ? "text-paper" : "text-ink")}>
          Enquiry received. Thank you.
        </h3>
        <p className={cn("max-w-md text-sm leading-relaxed", dark ? "text-paper/60" : "text-ink/65")}>
          {brand.responsePromise} If it is urgent, write to{" "}
          <a href={mailHref} className="underline underline-offset-4">
            {brand.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-1 text-[0.78rem] font-medium underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  // React Hook Form invokes this from the submit event; the handler only reads
  // timing/idempotency refs at that point, never during render.
  // eslint-disable-next-line react-hooks/refs
  const submitHandler = handleSubmit(onSubmit);

  return (
    <form onSubmit={submitHandler} noValidate className={cn("flex flex-col gap-1", className)}>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor={id("name")} error={errors.name?.message} tone={dark ? "light" : "dark"}>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            placeholder="Jordan Lee"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor={id("email")} error={errors.email?.message} tone={dark ? "light" : "dark"}>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
            {...register("email")}
          />
        </Field>

        {variant === "full" ? (
          <>
            <Field
              label="Phone"
              htmlFor={id("phone")}
              optional
              error={errors.phone?.message}
              tone={dark ? "light" : "dark"}
            >
              <input
                id={id("phone")}
                type="tel"
                autoComplete="tel"
                placeholder="+91 12345 67890"
                aria-invalid={Boolean(errors.phone)}
                className={inputClass}
                {...register("phone")}
              />
            </Field>

            <Field
              label="Company"
              htmlFor={id("company")}
              optional
              error={errors.company?.message}
              tone={dark ? "light" : "dark"}
            >
              <input
                id={id("company")}
                type="text"
                autoComplete="organization"
                placeholder="Company name"
                className={inputClass}
                {...register("company")}
              />
            </Field>
          </>
        ) : null}

        <Field
          label="Service of interest"
          htmlFor={id("service")}
          error={errors.service?.message}
          tone={dark ? "light" : "dark"}
          className={variant === "compact" ? "sm:col-span-2" : undefined}
        >
          <select
            id={id("service")}
            aria-invalid={Boolean(errors.service)}
            className={cn(inputClass, "appearance-none bg-[right_1rem_center] pr-10")}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled className="text-ink">
              Choose a service
            </option>
            {serviceInterestOptions.map((option) => (
              <option key={option} value={option} className="text-ink">
                {option}
              </option>
            ))}
          </select>
        </Field>

        {variant === "full" ? (
          <Field
            label="Budget range"
            htmlFor={id("budget")}
            optional
            error={errors.budget?.message}
            tone={dark ? "light" : "dark"}
          >
            <select
              id={id("budget")}
              className={cn(inputClass, "appearance-none bg-[right_1rem_center] pr-10")}
              defaultValue=""
              {...register("budget")}
            >
              <option value="" className="text-ink">
                Not specified
              </option>
              {budgetOptions.map((option) => (
                <option key={option} value={option} className="text-ink">
                  {option}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
      </div>

      <Field
        label="What are you working on?"
        htmlFor={id("message")}
        error={errors.message?.message}
        tone={dark ? "light" : "dark"}
      >
        <textarea
          id={id("message")}
          rows={variant === "compact" ? 3 : 5}
          placeholder="A little context on the business, the goal and any timing."
          aria-invalid={Boolean(errors.message)}
          className={cn(inputClass, "resize-y")}
          {...register("message")}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor={id("consent")}
          className={cn(
            "flex cursor-pointer items-start gap-3 text-[0.8rem] leading-relaxed",
            dark ? "text-paper/70" : "text-ink/70",
          )}
        >
          <input
            id={id("consent")}
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-coral)]"
            {...register("consent")}
          />
          <span>
            I agree to SOSIAL using these details to reply to my enquiry, as described in the{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-coral">
              privacy policy
            </a>
            .
          </span>
        </label>
        <p
          className={cn("min-h-[1rem] text-[0.72rem]", errors.consent ? "text-coral" : "text-transparent")}
          aria-live="polite"
        >
          {errors.consent?.message ?? ""}
        </p>
      </div>

      {failure ? (
        <p
          role="alert"
          className="mb-2 rounded-xl border-2 border-coral/50 bg-coral/10 px-4 py-3 text-[0.82rem] font-medium leading-relaxed text-coral"
        >
          {failure}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 px-6 text-[0.86rem] font-semibold text-white transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-violet-deep hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none",
            dark
              ? "border-paper/30 bg-coral shadow-[3px_3px_0_0_var(--color-paper)] hover:shadow-[4px_4px_0_0_var(--color-paper)]"
              : "border-ink bg-coral shadow-hard-xs hover:shadow-hard-sm",
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </>
          )}
        </button>
        <p className={cn("text-[0.72rem] font-medium leading-snug", dark ? "text-paper/55" : "text-ink/55")}>
          No newsletters. No sales sequences.
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {isSubmitting ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}
