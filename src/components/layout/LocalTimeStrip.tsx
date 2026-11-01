"use client";

import { useEffect, useState } from "react";

/** Sosial works out of Bengaluru, so the strip always reads Indian Standard Time. */
const TIME_ZONE = "Asia/Kolkata";

const formatDay = new Intl.DateTimeFormat("en-IN", { weekday: "long", timeZone: TIME_ZONE });
const formatDate = new Intl.DateTimeFormat("en-IN", { day: "2-digit", timeZone: TIME_ZONE });
const formatMonth = new Intl.DateTimeFormat("en-IN", { month: "long", timeZone: TIME_ZONE });
const formatTime = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: TIME_ZONE,
});

type Stamp = {
  day: string;
  date: string;
  month: string;
  time: string;
  iso: string;
};

function readStamp(): Stamp {
  const now = new Date();

  return {
    day: formatDay.format(now),
    date: formatDate.format(now),
    month: formatMonth.format(now),
    time: formatTime.format(now),
    iso: now.toISOString(),
  };
}

const PLACEHOLDER: Stamp = {
  day: "\u2014",
  date: "\u2014",
  month: "\u2014",
  time: "\u2014\u2014:\u2014\u2014",
  iso: "",
};

/**
 * A live day / date / month / time readout, mirroring the small uppercase
 * metadata labels used across the site. Rendered client-side only so the
 * server never guesses a timezone.
 */
export function LocalTimeStrip() {
  const [stamp, setStamp] = useState<Stamp | null>(null);

  useEffect(() => {
    const tick = () => setStamp(readStamp());

    tick();
    const id = window.setInterval(tick, 1000);

    return () => window.clearInterval(id);
  }, []);

  const value = stamp ?? PLACEHOLDER;

  const items = [
    { label: "Day", content: value.day },
    { label: "Date", content: value.date },
    { label: "Month", content: value.month },
    { label: "Time", content: value.time, time: true },
  ];

  return (
    <div className="flex flex-col gap-7 border-b border-paper/12 py-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-soft opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral-soft" />
        </span>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-paper/40">
          Bengaluru, India <span className="text-paper/25">/</span> IST
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:items-end sm:gap-x-10">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-paper/30">
              {item.label}
            </dt>
            <dd className="mt-1.5 font-display text-[0.95rem] font-semibold leading-none tracking-[-0.01em] text-paper/80 tabular-nums">
              {item.time ? (
                <time dateTime={stamp?.iso} suppressHydrationWarning>
                  {item.content}
                </time>
              ) : (
                <span suppressHydrationWarning>{item.content}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
