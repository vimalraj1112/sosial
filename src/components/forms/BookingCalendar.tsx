"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, Globe, Loader2, Video } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { Logo } from "@/components/brand/Logo";
import { Field, inputOnDark } from "@/components/ui/Field";
import { booking, monthNames, weekdayLong, weekdayShort } from "@/data/booking";
import { brand, mailHref } from "@/data/brand";
import { bookingRequestSchema, type BookingRequestValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Day = { y: number; m: number; d: number };

const DAY_MS = 24 * 60 * 60 * 1000;

const zonedToday = new Intl.DateTimeFormat("en-CA", {
  timeZone: booking.timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function todayInZone(): Day {
  const [y, m, d] = zonedToday.format(new Date()).split("-").map(Number);
  return { y, m: m - 1, d };
}

const dayValue = (day: Day) => Date.UTC(day.y, day.m, day.d);

const weekdayOf = (day: Day) => new Date(dayValue(day)).getUTCDay();

function addDays(day: Day, amount: number): Day {
  const date = new Date(dayValue(day) + amount * DAY_MS);
  return { y: date.getUTCFullYear(), m: date.getUTCMonth(), d: date.getUTCDate() };
}

const sameDay = (a: Day, b: Day) => a.y === b.y && a.m === b.m && a.d === b.d;

const monthIndex = (value: { y: number; m: number }) => value.y * 12 + value.m;

function buildCells(view: { y: number; m: number }): Array<Day | null> {
  const first = new Date(Date.UTC(view.y, view.m, 1));
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const cells: Array<Day | null> = Array.from({ length: first.getUTCDay() }, () => null);

  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ y: view.y, m: view.m, d });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

function ordinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  if (value % 10 === 1) return `${value}st`;
  if (value % 10 === 2) return `${value}nd`;
  if (value % 10 === 3) return `${value}rd`;
  return `${value}th`;
}

function formatDayLabel(day: Day, short = false) {
  const weekday = short ? weekdayShort[weekdayOf(day)] : weekdayLong[weekdayOf(day)];
  return `${weekday} ${ordinal(day.d)} ${monthNames[day.m]}`;
}

function formatSlot(time: string, hour12: boolean) {
  const [hours, minutes] = time.split(":").map(Number);

  if (!hour12) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const period = hours >= 12 ? "pm" : "am";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function createKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * The current IST day only exists in the browser. `useSyncExternalStore` lets
 * the server render a stable placeholder and the client swap in the real date
 * after hydration, without a setState-in-effect cascade.
 */
let cachedToday: Day | null = null;

function getClientToday(): Day | null {
  if (typeof window === "undefined") return null;
  if (!cachedToday) cachedToday = todayInZone();
  return cachedToday;
}

const subscribeToNothing = () => () => {};

export function BookingCalendar() {
  const uid = useId();
  const today = useSyncExternalStore(subscribeToNothing, getClientToday, () => null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<Day | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [hour12, setHour12] = useState(true);
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const startedAt = useRef(0);
  const idempotencyKey = useRef("");
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    idempotencyKey.current = createKey();
  }, []);

  // Bring the confirmation form into view on small screens after a slot click.
  useEffect(() => {
    if (!slot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [slot]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingRequestValues>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      note: "",
      consent: false,
      website: "",
    },
  });

  const id = (name: string) => `${uid}-${name}`;

  const earliest = today ? addDays(today, booking.leadDays) : null;
  const activeView = view ?? (today ? { y: today.y, m: today.m } : null);
  const cells = activeView ? buildCells(activeView) : [];

  const canGoPrev = Boolean(
    today && activeView && monthIndex(activeView) > monthIndex({ y: today.y, m: today.m }),
  );
  const canGoNext = Boolean(
    today &&
      activeView &&
      monthIndex(activeView) < monthIndex({ y: today.y, m: today.m }) + booking.monthsAhead,
  );

  const shiftMonth = (delta: number) => {
    if (!activeView) return;
    const next = new Date(Date.UTC(activeView.y, activeView.m + delta, 1));
    setView({ y: next.getUTCFullYear(), m: next.getUTCMonth() });
  };

  const pickDay = (day: Day) => {
    setSelected(day);
    setSlot(null);
    setFailure(null);
  };

  const onSubmit = async (values: BookingRequestValues) => {
    if (!selected || !slot) return;
    setFailure(null);

    // Runs from the submit event, never during render.
    // eslint-disable-next-line react-hooks/purity
    const started = startedAt.current || Date.now();
    const key = idempotencyKey.current || createKey();
    idempotencyKey.current = key;

    const slotLabel = `${formatSlot(slot, false)} ${booking.timezoneLabel}`;
    const message = [
      "Intro call request",
      `Preferred slot: ${formatDayLabel(selected, false)} at ${slotLabel}`,
      `Duration: ${booking.durationLabel}`,
      "",
      values.note?.trim() || "No additional notes.",
    ].join("\n");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone ?? "",
          company: "",
          service: "Intro call",
          budget: "",
          message,
          consent: true,
          website: values.website ?? "",
          startedAt: started,
          idempotencyKey: key,
        }),
        cache: "no-store",
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setFailure(
          data?.error ?? `We could not send your request. Please email ${brand.email} and we will book it there.`,
        );
        return;
      }

      setSent(true);
      reset();
      idempotencyKey.current = createKey();
    } catch {
      setFailure(
        `Your request did not send, most likely a connection issue. Please try again or email ${brand.email}.`,
      );
    }
  };

  // React Hook Form invokes this from the submit event.
  // eslint-disable-next-line react-hooks/refs
  const submitHandler = handleSubmit(onSubmit);

  if (sent && selected && slot) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-auto flex max-w-2xl flex-col items-center rounded-card border border-paper/15 bg-night-soft px-6 py-10 text-center sm:px-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-paper/20 bg-coral text-white">
          <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.025em]">
          Slot requested. Thank you.
        </h3>
        <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-paper/60">
          You asked for{" "}
          <span className="font-semibold text-paper">
            {formatDayLabel(selected)}, {formatSlot(slot, hour12)} IST
          </span>
          . {brand.responsePromise} We will confirm the slot by email.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setSlot(null);
          }}
          className="mt-6 text-[0.8rem] font-medium underline underline-offset-4 text-paper/60 transition-colors hover:text-paper"
        >
          Choose another time
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-card border border-paper/12 bg-night-soft">
        <div className="grid divide-y divide-paper/10 lg:grid-cols-[1.02fr_1.42fr_1fr] lg:divide-x lg:divide-y-0">
          {/* Meeting details */}
          <div className="p-5 sm:p-6">
            <Logo className="h-8" label="" variant="reversed" sizes="120px" />
            <p className="mt-5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-paper/35">
              {brand.name}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.025em]">
              30 min intro call
            </h3>
            <div className="mt-5 flex flex-col gap-3 text-[0.82rem] text-paper/60">
              <span className="inline-flex items-center gap-2.5">
                <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-coral-soft" strokeWidth={1.8} />
                {booking.durationLabel}
              </span>
              <span className="inline-flex items-center gap-2.5">
                <Video aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-coral-soft" strokeWidth={1.8} />
                {booking.meetingLabel}
              </span>
              <span className="inline-flex items-center gap-2.5">
                <Globe aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-coral-soft" strokeWidth={1.8} />
                {booking.timezoneLabel}
              </span>
            </div>
            <p className="mt-6 border-t border-paper/10 pt-4 text-[0.72rem] leading-relaxed text-paper/40">
              No pitch deck, no pressure. A useful conversation about what you are trying to change.
            </p>
          </div>

          {/* Month + day picker */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-[1.05rem] font-semibold tracking-[-0.02em]">
                {activeView ? `${monthNames[activeView.m]} ${activeView.y}` : "\u2014"}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => shiftMonth(-1)}
                  disabled={!canGoPrev}
                  aria-label="Previous month"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-colors hover:border-paper/40 hover:text-paper disabled:pointer-events-none disabled:opacity-25"
                >
                  <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => shiftMonth(1)}
                  disabled={!canGoNext}
                  aria-label="Next month"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-colors hover:border-paper/40 hover:text-paper disabled:pointer-events-none disabled:opacity-25"
                >
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1" aria-hidden="true">
              {weekdayShort.map((day) => (
                <span
                  key={day}
                  className="pb-1 text-center text-[0.54rem] font-semibold uppercase tracking-[0.12em] text-paper/30"
                >
                  {day.slice(0, 3)}
                </span>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1">
              {activeView
                ? cells.map((cell, index) => {
                    if (!cell) return <span key={`empty-${index}`} aria-hidden="true" />;

                    const disabled = Boolean(
                      !earliest ||
                        dayValue(cell) < dayValue(earliest) ||
                        !booking.openWeekdays.includes(weekdayOf(cell)),
                    );
                    const isSelected = selected ? sameDay(cell, selected) : false;
                    const isToday = today ? sameDay(cell, today) : false;

                    return (
                      <button
                        key={dayValue(cell)}
                        type="button"
                        onClick={() => pickDay(cell)}
                        disabled={disabled}
                        aria-pressed={isSelected}
                        aria-label={formatDayLabel(cell, false)}
                        className={cn(
                          "relative flex h-9 items-center justify-center rounded-lg text-[0.82rem] font-medium tabular-nums transition-colors sm:h-10",
                          isSelected
                            ? "bg-coral text-white"
                            : disabled
                              ? "cursor-not-allowed text-paper/20"
                              : "text-paper/75 hover:bg-paper/10 hover:text-paper",
                        )}
                      >
                        {cell.d}
                        {isToday && !isSelected ? (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-1 h-1 w-1 rounded-full bg-coral-soft"
                          />
                        ) : null}
                      </button>
                    );
                  })
                : Array.from({ length: 35 }, (_, index) => (
                    <span
                      key={`skeleton-${index}`}
                      aria-hidden="true"
                      className="h-9 rounded-lg bg-paper/[0.04] sm:h-10"
                    />
                  ))}
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[0.64rem] font-medium uppercase tracking-[0.1em] text-paper/30">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-coral-soft" />
              Today
              <span className="ml-auto normal-case tracking-normal">Open Mon&ndash;Sat</span>
            </p>
          </div>

          {/* Time slots */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-[0.95rem] font-semibold tracking-[-0.01em]">
                {selected ? formatDayLabel(selected, true) : "Pick a day"}
              </p>
              <div className="flex rounded-full border border-paper/15 p-0.5">
                {[
                  { label: "12h", value: true },
                  { label: "24h", value: false },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setHour12(option.value)}
                    aria-pressed={hour12 === option.value}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                      hour12 === option.value
                        ? "bg-paper text-ink"
                        : "text-paper/45 hover:text-paper/80",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {selected ? (
              <div className="mt-4 grid max-h-[19rem] grid-cols-2 gap-2 overflow-y-auto pr-1">
                {booking.slotTimes.map((time) => {
                  const active = slot === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSlot(time)}
                      aria-pressed={active}
                      className={cn(
                        "h-9 rounded-lg border text-[0.78rem] font-medium tabular-nums transition-colors",
                        active
                          ? "border-coral bg-coral text-white"
                          : "border-paper/15 bg-paper/[0.04] text-paper/75 hover:border-coral/60 hover:text-paper",
                      )}
                    >
                      {formatSlot(time, hour12)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 max-w-[16rem] text-[0.8rem] leading-relaxed text-paper/40">
                Choose a day in the calendar, then pick a time that suits you.
              </p>
            )}
          </div>
        </div>
      </div>

      {slot && selected ? (
        <div
          ref={detailsRef}
          className="mt-5 rounded-card border border-paper/12 bg-night-soft p-5 sm:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-paper/10 pb-5">
            <div>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-paper/40">
                Your slot
              </p>
              <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.02em]">
                {formatDayLabel(selected)} <span className="text-paper/30">&middot;</span>{" "}
                {formatSlot(slot, hour12)}{" "}
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-paper/40">
                  IST
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSlot(null)}
              className="text-[0.76rem] font-medium text-paper/55 underline underline-offset-4 transition-colors hover:text-paper"
            >
              Change time
            </button>
          </div>

          <form onSubmit={submitHandler} noValidate className="mt-5 flex flex-col gap-1">
            <div className="grid gap-x-4 sm:grid-cols-3">
              <Field
                label="Your name"
                htmlFor={id("name")}
                error={errors.name?.message}
                tone="light"
              >
                <input
                  id={id("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  aria-invalid={Boolean(errors.name)}
                  className={inputOnDark}
                  {...register("name")}
                />
              </Field>

              <Field
                label="Email"
                htmlFor={id("email")}
                error={errors.email?.message}
                tone="light"
              >
                <input
                  id={id("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className={inputOnDark}
                  {...register("email")}
                />
              </Field>

              <Field
                label="Phone"
                htmlFor={id("phone")}
                optional
                error={errors.phone?.message}
                tone="light"
              >
                <input
                  id={id("phone")}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 12345 67890"
                  aria-invalid={Boolean(errors.phone)}
                  className={inputOnDark}
                  {...register("phone")}
                />
              </Field>
            </div>

            <Field
              label="What would you like to talk about?"
              htmlFor={id("note")}
              optional
              error={errors.note?.message}
              tone="light"
            >
              <textarea
                id={id("note")}
                rows={3}
                placeholder="The business, the goal, and any timing we should know about."
                aria-invalid={Boolean(errors.note)}
                className={cn(inputOnDark, "resize-y")}
                {...register("note")}
              />
            </Field>

            {/* Honeypot: hidden from people, tempting to bots. */}
            <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor={id("website")}>Website</label>
              <input
                id={id("website")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor={id("consent")}
                className="flex cursor-pointer items-start gap-3 text-[0.8rem] leading-relaxed text-paper/70"
              >
                <input
                  id={id("consent")}
                  type="checkbox"
                  aria-invalid={Boolean(errors.consent)}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-coral)]"
                  {...register("consent")}
                />
                <span>
                  I agree to SOSIAL using these details to arrange this call, as described in the{" "}
                  <a href="/privacy" className="underline underline-offset-4 hover:text-coral-soft">
                    privacy policy
                  </a>
                  .
                </span>
              </label>
              <p
                className={cn(
                  "min-h-[1rem] text-[0.72rem]",
                  errors.consent ? "text-coral-soft" : "text-transparent",
                )}
                aria-live="polite"
              >
                {errors.consent?.message ?? ""}
              </p>
            </div>

            {failure ? (
              <p
                role="alert"
                className="mb-2 rounded-xl border border-coral/50 bg-coral/10 px-4 py-3 text-[0.82rem] font-medium leading-relaxed text-coral-soft"
              >
                {failure}
              </p>
            ) : null}

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-paper/30 bg-coral px-6 text-[0.86rem] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-violet-deep disabled:pointer-events-none disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Request this slot
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </>
                )}
              </button>
              <p className="text-[0.72rem] font-medium leading-snug text-paper/45">
                We confirm every slot by email. Prefer writing instead?{" "}
                <a href={mailHref} className="underline underline-offset-4 hover:text-paper/75">
                  {brand.email}
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <p className="mt-4 text-center text-[0.72rem] leading-relaxed text-paper/35">
          Pick a day, then a time. All times are shown in {booking.timezoneLabel}.
        </p>
      )}
    </div>
  );
}
