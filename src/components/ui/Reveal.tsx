import type { HTMLAttributes, ReactNode } from "react";

/**
 * Scroll-reveal variants. The motion itself lives in globals.css and is driven
 * by RevealController, so these work in server and client components alike.
 *
 * - up / left / right: fade with a short travel (text, blocks, cards)
 * - scale: settle from 94% (stat cards, compact panels)
 * - fade: opacity only (dense UI, footers)
 * - blur: rise out of a soft blur (large numbers, sparingly)
 * - rise: a heading lifts up through a mask
 * - mask-up / mask-left / mask-right: images uncover like a curtain while the
 *   media inside settles from a slight zoom
 *
 * Inside a revealing element (a mask especially), mark follow-on content with
 * `data-reveal-child`: it animates just after its parent, with no observer of
 * its own.
 */
export type RevealVariant =
  | "up"
  | "left"
  | "right"
  | "scale"
  | "fade"
  | "blur"
  | "rise"
  | "mask-up"
  | "mask-left"
  | "mask-right";

/**
 * Spread onto any element to make it reveal on scroll:
 * `<h2 {...reveal("rise")}>`. The optional delay is a minimum; elements that
 * enter together already cascade automatically.
 */
export function reveal(variant: RevealVariant = "up", delay?: number) {
  return {
    "data-reveal": variant,
    ...(delay ? { "data-reveal-delay": String(delay) } : {}),
  } as Record<string, string>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "section" | "article" | "li" | "span" | "p" | "figure" | "header" | "footer";
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function Reveal({ children, className, delay, variant = "up", as = "div", ...rest }: RevealProps) {
  // Plain JSX (not createElement) so static children keep React's
  // "no key needed" marking when this server component reaches the client.
  const Tag = as;
  return (
    <Tag {...rest} className={className} {...reveal(variant, delay)}>
      {children}
    </Tag>
  );
}
