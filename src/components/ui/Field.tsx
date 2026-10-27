import { cn } from "@/lib/utils";

export const inputBase =
  "w-full rounded-field border-2 border-ink/20 bg-white px-4 py-3.5 text-[0.95rem] font-medium text-ink placeholder:font-normal placeholder:text-ink/40 transition-[border-color,box-shadow,background-color] duration-200 hover:border-ink/40 focus:border-ink focus:outline-none focus:shadow-[0_0_0_3px_rgba(130,33,252,0.18)] aria-[invalid=true]:border-coral";

export const inputOnDark =
  "w-full rounded-field border-2 border-paper/20 bg-night-soft px-4 py-3.5 text-[0.95rem] font-medium text-paper placeholder:font-normal placeholder:text-paper/35 transition-[border-color,box-shadow,background-color] duration-200 hover:border-paper/40 focus:border-coral focus:outline-none focus:shadow-[0_0_0_3px_rgba(130,33,252,0.16)] aria-[invalid=true]:border-coral";

export function Field({
  label,
  htmlFor,
  error,
  optional,
  tone = "dark",
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-[0.72rem] font-semibold uppercase tracking-[0.1em]",
            tone === "light" ? "text-paper/75" : "text-ink/70",
          )}
        >
          {label}
        </label>
        {optional ? (
          <span className={cn("text-[0.66rem] font-medium", tone === "light" ? "text-paper/40" : "text-ink/40")}>
            Optional
          </span>
        ) : null}
      </div>
      {children}
      <p
        className={cn(
          "min-h-[1rem] text-[0.72rem] font-medium leading-snug",
          error
            ? tone === "light"
              ? "text-coral-soft"
              : "text-coral"
            : "text-transparent",
        )}
        aria-live="polite"
      >
        {error ?? ""}
      </p>
    </div>
  );
}
