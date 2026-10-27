"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function Accordion({
  items,
  className,
  tone = "dark",
  defaultOpen = null,
}: {
  items: Item[];
  className?: string;
  tone?: "dark" | "light";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduced = useReducedMotion();

  return (
    <div className={cn("divide-y", tone === "light" ? "divide-paper/15" : "divide-ink/15", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors",
                  tone === "light" ? "text-paper hover:text-coral-soft" : "text-ink hover:text-coral",
                )}
              >
                <span className="font-display text-[1.02rem] font-semibold tracking-[-0.02em] sm:text-[1.12rem]">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    tone === "light" ? "border-paper/30" : "border-ink/25",
                    isOpen && "rotate-45 border-ink bg-coral text-white shadow-[2px_2px_0_0_var(--color-ink)]",
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-2xl pb-7 pr-10 text-[0.95rem] leading-relaxed",
                      tone === "light" ? "text-paper/65" : "text-ink/65",
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
