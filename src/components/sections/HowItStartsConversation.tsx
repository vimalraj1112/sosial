"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Message = {
  from: "them" | "us";
  text: string;
};

// The example first conversation, typed out message by message.
const conversation: Message[] = [
  { from: "them", text: "Hey, I need a website and some Reels." },
  { from: "us", text: "Nice. What’s the goal, and by when?" },
  { from: "them", text: "More enquiries. Next month, ideally." },
  { from: "us", text: "Got it. We’ll send a plan with the scope and timeline in writing." },
  { from: "us", text: "You approve, we create, you review. Simple." },
];

const SPEED = 12;
const GAP_BEFORE_MESSAGE = 220;
const PAUSE_AFTER_MESSAGE = 320;

function bubbleClass(from: Message["from"]) {
  return cn(
    "max-w-[86%] rounded-[18px] px-4 py-3 text-[0.86rem] leading-relaxed sm:max-w-[78%] sm:text-[0.9rem]",
    from === "them"
      ? "ml-auto rounded-br-[5px] bg-coral text-white shadow-[0_10px_24px_-16px_rgba(130,33,252,0.9)]"
      : "mr-auto rounded-bl-[5px] border border-ink/12 bg-paper text-ink",
  );
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="caret-blink ml-[0.08em] inline-block h-[0.9em] w-[0.06em] translate-y-[0.08em] bg-current align-baseline"
    />
  );
}

export function Conversation() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          return;
        }

        // Reset on the way out so the conversation types again next time.
        setInView(false);
        setMessageIndex(0);
        setTyped(0);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    if (messageIndex >= conversation.length) return;

    const text = conversation[messageIndex].text;

    if (typed >= text.length) {
      const pause = setTimeout(() => {
        setMessageIndex((index) => index + 1);
        setTyped(0);
      }, PAUSE_AFTER_MESSAGE);
      return () => clearTimeout(pause);
    }

    const timer = setTimeout(
      () => setTyped((count) => count + 1),
      typed === 0 ? GAP_BEFORE_MESSAGE : SPEED,
    );
    return () => clearTimeout(timer);
  }, [inView, reduced, messageIndex, typed]);

  // Reduced motion (or finished typing) shows everything immediately.
  const activeIndex = reduced ? conversation.length : messageIndex;
  const activeChars = reduced ? Number.MAX_SAFE_INTEGER : typed;

  return (
    <div ref={ref} className="grid">
      {/* Reserves the finished height so the card never grows while typing. */}
      <ul
        aria-hidden="true"
        className="pointer-events-none flex select-none flex-col gap-2.5 opacity-0 [grid-area:1/1]"
      >
        {conversation.map((message) => (
          <li key={message.text}>
            <div className={bubbleClass(message.from)}>{message.text}</div>
          </li>
        ))}
      </ul>

      <ul aria-hidden="true" className="flex flex-col gap-2.5 [grid-area:1/1]">
        {conversation.map((message, index) => {
          if (index > activeIndex) return null;

          const text =
            index < activeIndex ? message.text : message.text.slice(0, activeChars);
          const isTyping = !reduced && index === messageIndex && messageIndex < conversation.length;

          return (
            <li key={message.text}>
              <div className={bubbleClass(message.from)}>
                {text}
                {isTyping ? <Caret /> : null}
              </div>
            </li>
          );
        })}
      </ul>

      <ul className="sr-only [grid-area:1/1]">
        {conversation.map((message) => (
          <li key={message.text}>
            {message.from === "them" ? "You:" : "Sosial:"} {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
