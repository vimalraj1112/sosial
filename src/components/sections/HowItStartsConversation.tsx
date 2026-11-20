"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Camera,
  CheckCheck,
  EllipsisVertical,
  Mic,
  Paperclip,
  Phone,
  SendHorizontal,
  Smile,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  /** "us" is Sosial (outgoing, right); "client" is the business (incoming, left). */
  from: "us" | "client";
  text: string;
  time: string;
};

/** A sample client. The chat is seen from Sosial's phone. */
const client = {
  name: "Rahul Mehta",
  photo: "/assets/images/client-dp.jpg",
};

const conversation: Message[] = [
  { from: "client", text: "Hello, I saw your work on Instagram.", time: "10:02" },
  { from: "us", text: "Hello Rahul, thank you for reaching out. How can we help?", time: "10:02" },
  { from: "client", text: "We need social media and a new website for our restaurant.", time: "10:04" },
  { from: "us", text: "Happy to help. When would you like to launch?", time: "10:05" },
  { from: "client", text: "In about a month.", time: "10:06" },
  { from: "us", text: "Perfect. We’ll share a plan with scope, timeline and cost by tomorrow.", time: "10:07" },
];

/** Milliseconds per character while the visitor's message is being typed. */
const TYPE_SPEED = 32;
const BEFORE_SEND = 280;
const READ_DELAY = 650;
const REPLY_TYPING = 1100;
const BETWEEN = 450;

// WhatsApp's light theme, kept to the colours the real app uses for these parts.
const wa = {
  header: "bg-[#008069]",
  wallpaper: "bg-[#EFEAE2]",
  outgoing: "bg-[#D9FDD3]",
  incoming: "bg-white",
  text: "text-[#111B21]",
  meta: "text-[#667781]",
  read: "text-[#53BDEB]",
  bar: "bg-[#F0F2F5]",
  action: "bg-[#00A884]",
};

function Bubble({
  message,
  first,
  read,
}: {
  message: Message;
  /** First bubble in a run from the same sender carries the tail. */
  first: boolean;
  read: boolean;
}) {
  const out = message.from === "us";
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start", first ? "mt-2" : "mt-0.5")}>
      <div
        className={cn(
          "relative max-w-[82%] rounded-[8px] px-2.5 pb-1.5 pt-1.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] sm:max-w-[72%]",
          out ? wa.outgoing : wa.incoming,
          first && (out ? "rounded-tr-none" : "rounded-tl-none"),
        )}
      >
        {first ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 8 13"
            className={cn(
              "absolute top-0 h-[13px] w-2",
              out ? "-right-2 fill-[#D9FDD3]" : "-left-2 -scale-x-100 fill-white",
            )}
          >
            <path d="M0 0h8L1.5 9.5C1 10.2 0 9.9 0 9V0Z" />
          </svg>
        ) : null}
        <p className={cn("text-[0.86rem] leading-[1.35] sm:text-[0.9rem]", wa.text)}>
          {message.text}
          {/* Invisible spacer so the time never overlaps the last line. */}
          <span aria-hidden="true" className="inline-block w-[4.2rem]" />
        </p>
        <span
          className={cn(
            "absolute bottom-1 right-2 inline-flex items-center gap-1 text-[0.66rem] leading-none",
            wa.meta,
          )}
        >
          {message.time}
          {out ? (
            <CheckCheck
              aria-hidden="true"
              className={cn("h-[0.95rem] w-[0.95rem] transition-colors duration-300", read ? wa.read : wa.meta)}
              strokeWidth={2.2}
            />
          ) : null}
        </span>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="mt-2 flex justify-start">
      <div className={cn("relative rounded-[8px] rounded-tl-none px-3.5 py-3 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]", wa.incoming)}>
        <svg aria-hidden="true" viewBox="0 0 8 13" className="absolute -left-2 top-0 h-[13px] w-2 -scale-x-100 fill-white">
          <path d="M0 0h8L1.5 9.5C1 10.2 0 9.9 0 9V0Z" />
        </svg>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-2 w-2 animate-bounce rounded-full bg-[#8696A0]"
              style={{ animationDelay: `${dot * 140}ms`, animationDuration: "900ms" }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/**
 * A sample first chat with a client, styled as WhatsApp on Sosial's phone.
 * Sosial's replies type into the message bar and send; the client's messages
 * show "typing…" first. It replays each time the chat scrolls back into view.
 */
export function Conversation() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [delivered, setDelivered] = useState(0);
  const [readUpTo, setReadUpTo] = useState(0);
  const [draft, setDraft] = useState("");
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          return;
        }
        // Reset on the way out so the chat plays again next time.
        setInView(false);
        setDelivered(0);
        setReadUpTo(0);
        setDraft("");
        setReplying(false);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    (async () => {
      await wait(400);
      for (let i = 0; i < conversation.length && !cancelled; i++) {
        const message = conversation[i];
        if (message.from === "us") {
          for (let c = 1; c <= message.text.length && !cancelled; c++) {
            setDraft(message.text.slice(0, c));
            await wait(TYPE_SPEED);
          }
          await wait(BEFORE_SEND);
          if (cancelled) return;
          setDraft("");
          setDelivered(i + 1);
          await wait(READ_DELAY);
          if (cancelled) return;
          setReadUpTo(i + 1);
        } else {
          setReplying(true);
          await wait(REPLY_TYPING);
          if (cancelled) return;
          setReplying(false);
          setDelivered(i + 1);
          setReadUpTo(i + 1);
        }
        await wait(BETWEEN);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, reduced]);

  const shown = reduced ? conversation.length : delivered;
  const read = reduced ? conversation.length : readUpTo;
  const status = replying ? "typing…" : "online";

  const renderMessages = (count: number, readCount: number) =>
    conversation.slice(0, count).map((message, index) => (
      <Bubble
        key={message.text}
        message={message}
        first={index === 0 || conversation[index - 1].from !== message.from}
        read={index < readCount}
      />
    ));

  return (
    <div ref={ref} className="flex flex-col">
      {/* Header */}
      <div className={cn("flex items-center gap-2.5 px-2.5 py-2 text-white sm:gap-3 sm:px-3.5", wa.header)}>
        <ArrowLeft aria-hidden="true" className="h-5 w-5 shrink-0 opacity-95" strokeWidth={2} />
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white">
          <Image src={client.photo} alt="" fill sizes="36px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[0.95rem] font-medium">{client.name}</p>
          <p aria-live="off" className="truncate text-[0.72rem] text-white/80">
            {status}
          </p>
        </div>
        <div aria-hidden="true" className="flex items-center gap-4 pr-0.5 sm:gap-5">
          <Video className="h-5 w-5" strokeWidth={1.9} />
          <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.9} />
          <EllipsisVertical className="h-5 w-5" strokeWidth={1.9} />
        </div>
      </div>

      {/* Chat wallpaper */}
      <div
        className={cn("relative px-3 pb-3 pt-2.5 sm:px-5", wa.wallpaper)}
        style={{
          backgroundImage:
            "radial-gradient(rgba(84,101,111,0.07) 1.2px, transparent 1.3px), radial-gradient(rgba(84,101,111,0.05) 1px, transparent 1.1px)",
          backgroundSize: "22px 22px, 22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <div className="flex justify-center">
          <span className="rounded-[7px] bg-white/95 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-[0.04em] text-[#54656F] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
            Today
          </span>
        </div>

        <div className="grid">
          {/* Reserves the finished height so the card never grows while it plays. */}
          <div aria-hidden="true" className="pointer-events-none invisible pb-1 [grid-area:1/1]">
            {renderMessages(conversation.length, conversation.length)}
            <div className="h-10" />
          </div>

          <div aria-hidden="true" className="pb-1 [grid-area:1/1]">
            {renderMessages(shown, read)}
            {replying ? <TypingBubble /> : null}
          </div>

          <ul className="sr-only [grid-area:1/1]">
            {conversation.map((message) => (
              <li key={message.text}>
                {message.from === "us" ? "Sosial:" : `${client.name}:`} {message.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Message bar */}
      <div aria-hidden="true" className={cn("flex items-center gap-2 px-2 py-2 sm:px-3", wa.bar)}>
        <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full bg-white px-3 py-2 shadow-[0_1px_0.5px_rgba(11,20,26,0.08)]">
          <Smile className="h-5 w-5 shrink-0 text-[#54656F]" strokeWidth={1.8} />
          <span className={cn("min-w-0 flex-1 truncate text-[0.88rem]", draft ? wa.text : "text-[#8696A0]")}>
            {draft || "Message"}
            {draft ? <span className="caret-blink ml-px inline-block h-[1em] w-px translate-y-[0.15em] bg-[#00A884]" /> : null}
          </span>
          <Paperclip className="h-5 w-5 shrink-0 -rotate-45 text-[#54656F]" strokeWidth={1.8} />
          {draft ? null : <Camera className="h-5 w-5 shrink-0 text-[#54656F]" strokeWidth={1.8} />}
        </div>
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white", wa.action)}>
          {draft ? (
            <SendHorizontal className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
          ) : (
            <Mic className="h-5 w-5" strokeWidth={2} />
          )}
        </span>
      </div>
    </div>
  );
}
