import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "primary" | "reversed" | "white";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
  /** Accessible label. Set to "" when the logo sits inside a labelled link. */
  label?: string;
  /**
   * `primary` is the ink-on-light lockup, `reversed` is the light-on-dark
   * lockup and `white` is the single-colour version for violet/photography.
   */
  variant?: LogoVariant;
  priority?: boolean;
  sizes?: string;
};

const lockups: Record<LogoVariant, { src: string; width: number; height: number }> = {
  primary: {
    src: "/assets/brand/sosial-logo-primary.png",
    width: 1200,
    height: 399,
  },
  reversed: {
    src: "/assets/brand/sosial-logo-reversed.png",
    width: 1200,
    height: 399,
  },
  white: {
    src: "/assets/brand/sosial-logo-white.png",
    width: 1200,
    height: 399,
  },
};

const marks: Record<LogoVariant, { src: string; width: number; height: number }> = {
  primary: {
    src: "/assets/brand/sosial-mark-primary.png",
    width: 512,
    height: 501,
  },
  reversed: {
    src: "/assets/brand/sosial-mark-light.png",
    width: 512,
    height: 501,
  },
  white: {
    src: "/assets/brand/sosial-mark-light.png",
    width: 512,
    height: 501,
  },
};

/**
 * The supplied SOSIAL lockup from the brand identity PDF. Variants are
 * separate transparent PNGs, cropped to the artwork edge so header and footer
 * spacing stays consistent.
 */
export function Logo({
  className,
  markOnly = false,
  label = "SOSIAL",
  variant = "primary",
  priority = false,
  sizes = "(min-width: 1024px) 120px, 96px",
}: LogoProps) {
  const asset = markOnly ? marks[variant] : lockups[variant];

  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={label}
      aria-hidden={label ? undefined : true}
      priority={priority}
      sizes={sizes}
      className={cn("h-8 w-auto object-contain", className)}
    />
  );
}
