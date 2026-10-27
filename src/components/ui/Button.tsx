import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "primaryOnDark" | "outline" | "light" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full border-2 font-semibold tracking-[-0.01em] transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:pointer-events-none disabled:opacity-55 disabled:shadow-none";

const variants: Record<Variant, string> = {
  primary:
    "border-ink bg-coral text-white shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-violet-deep hover:text-white hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  primaryOnDark:
    "border-ink bg-coral text-white shadow-[3px_3px_0_0_var(--color-paper)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-paper hover:text-ink hover:shadow-[5px_5px_0_0_var(--color-paper)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  outline:
    "border-ink bg-transparent text-ink shadow-hard-xs hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-night hover:text-paper hover:shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  light:
    "border-ink bg-paper text-ink shadow-[3px_3px_0_0_var(--color-coral)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-coral hover:text-white hover:shadow-[5px_5px_0_0_var(--color-coral)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  dark:
    "border-ink bg-night text-paper shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-coral hover:text-white hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  ghost: "border-transparent bg-transparent text-ink shadow-none hover:text-coral",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-[0.82rem]",
  md: "h-[3.25rem] px-6 text-[0.92rem]",
  lg: "h-[3.75rem] px-7 text-[1rem]",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

function Inner({ children, arrow, size }: { children: ReactNode; arrow?: boolean; size: Size }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            "shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            size === "sm" ? "h-4 w-4" : "h-[1.05rem] w-[1.05rem]",
          )}
          strokeWidth={2}
        />
      ) : null}
    </>
  );
}

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    base,
    variants[variant],
    variant === "ghost" ? "h-auto px-0 text-[0.92rem]" : sizes[size],
    className,
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  ...rest
}: BaseProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      <Inner arrow={arrow} size={size}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      <Inner arrow={arrow} size={size}>
        {children}
      </Inner>
    </button>
  );
}
