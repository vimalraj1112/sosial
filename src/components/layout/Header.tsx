"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Camera,
  ChevronDown,
  Clapperboard,
  MapPin,
  Menu,
  MessagesSquare,
  MonitorSmartphone,
  PenTool,
  Phone,
  MessageCircle,
  Sun,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { announcement, brand, mailHref, navigation, telHref, whatsappHref } from "@/data/brand";
import { services, type IconName } from "@/data/services";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const icons: Record<IconName, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MessagesSquare,
  TrendingUp,
  PenTool,
  MonitorSmartphone,
  MapPin,
  Clapperboard,
  Camera,
  Sun,
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  const onHome = pathname === "/";
  const onDarkPage =
    pathname === "/work" ||
    pathname.startsWith("/work/") ||
    pathname === "/contact";
  const hasDarkHero =
    pathname === "/about" ||
    pathname === "/services" ||
    pathname.startsWith("/services/") ||
    pathname === "/insights" ||
    pathname.startsWith("/insights/") ||
    pathname === "/testimonials" ||
    pathname === "/privacy" ||
    pathname === "/terms";
  // Immersive pages keep the dark header while scrolling. Pages with a dark
  // opening hero switch to the light header as soon as the content begins.
  const overHero =
    !mobileOpen && (onDarkPage || ((onHome || hasDarkHero) && !scrolled));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close transient navigation UI when the route actually changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    window.dispatchEvent(
      new CustomEvent("sosial:scroll-lock", { detail: { locked: mobileOpen } }),
    );
    return () => {
      document.documentElement.style.overflow = "";
      window.dispatchEvent(
        new CustomEvent("sosial:scroll-lock", { detail: { locked: false } }),
      );
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const openDropdown = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  return (
    <>
      {announcement.enabled ? (
        <div className="relative z-[45] border-b border-paper/10 bg-night text-paper">
          <div className="container-x flex h-9 items-center justify-between gap-4 text-[0.68rem] tracking-[0.08em]">
            <div className="flex min-w-0 items-center gap-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
              <span className="truncate uppercase opacity-75">
                <span className="sm:hidden">{announcement.shortLabel}</span>
                <span className="hidden sm:inline">{announcement.label}</span>
              </span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-paper/20 sm:block" />
              <span className="hidden truncate opacity-60 sm:block">{announcement.message}</span>
            </div>
            <Link
              href={announcement.href}
              className="link-underline shrink-0 text-coral-soft transition-colors hover:text-paper"
            >
              {announcement.cta}
            </Link>
          </div>
        </div>
      ) : null}

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-500",
          overHero
            ? "border-transparent bg-night text-paper"
            : "border-ink/10 bg-paper/92 text-ink backdrop-blur-md",
        )}
      >
        <div className="container-x flex h-[4.75rem] items-center justify-between gap-5 lg:h-[5.25rem]">
          <Link
            href="/"
            aria-label="SOSIAL home"
            className="shrink-0 transition-opacity hover:opacity-80"
            onClick={() => setMobileOpen(false)}
          >
            <Logo
              className="h-8 lg:h-9"
              label=""
              variant={overHero ? "reversed" : "primary"}
              priority
              sizes="(min-width: 1024px) 138px, 122px"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      ref={triggerRef}
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      aria-haspopup="true"
                      onClick={() => setServicesOpen((value) => !value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3.5 py-2 text-[1rem] font-medium tracking-[0.01em] transition-colors",
                        active || servicesOpen
                          ? overHero
                            ? "text-coral-soft"
                            : "text-coral"
                          : overHero
                            ? "hover:text-coral-soft"
                            : "hover:text-coral",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("h-3.5 w-3.5 transition-transform duration-300", servicesOpen && "rotate-180")}
                        strokeWidth={1.8}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen ? (
                        <motion.div
                          id="services-menu"
                          initial={reduced ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 top-[calc(100%+0.6rem)] w-[42rem] -translate-x-1/2 rounded-2xl border-2 border-ink bg-card p-3 text-ink shadow-hard-lg"
                        >
                          <div className="grid grid-cols-2 gap-1">
                            {services.map((service) => {
                              const Icon = icons[service.icon];
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-night/[0.05]"
                                >
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink/15 bg-paper text-ink/70 transition-colors group-hover:border-ink group-hover:bg-coral group-hover:text-white">
                                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block font-display text-[0.95rem] font-semibold tracking-[-0.01em]">
                                      {service.name}
                                    </span>
                                    <span className="mt-0.5 block text-[0.72rem] leading-snug text-ink/50">
                                      {service.tagline}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-2 flex items-center justify-between border-t border-ink/10 px-3 pt-3">
                            <p className="text-[0.7rem] uppercase tracking-[0.12em] text-ink/45">
                              Eight services, one direction
                            </p>
                            <Link
                              href="/services"
                              onClick={() => setServicesOpen(false)}
                              className="group inline-flex items-center gap-1.5 text-[0.74rem] font-medium text-ink transition-colors hover:text-coral"
                            >
                              View all services
                              <ArrowUpRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                strokeWidth={1.8}
                              />
                            </Link>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 text-[1rem] font-medium tracking-[0.01em] transition-colors",
                    active
                      ? overHero
                        ? "text-coral-soft"
                        : "text-coral"
                      : overHero
                        ? "hover:text-coral-soft"
                        : "hover:text-coral",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                        overHero ? "bg-coral-soft" : "bg-coral",
                      )}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              aria-label="Call SOSIAL"
              className={cn(
                "hidden h-10 w-10 items-center justify-center rounded-full border-2 transition-colors xl:flex",
                overHero ? "border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink" : "border-ink/20 text-ink hover:border-ink hover:bg-night hover:text-paper",
              )}
            >
              <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message SOSIAL on WhatsApp"
              className={cn(
                "hidden h-10 w-10 items-center justify-center rounded-full border-2 transition-colors xl:flex",
                overHero ? "border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink" : "border-ink/20 text-ink hover:border-ink hover:bg-night hover:text-paper",
              )}
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <Link
              href="/contact"
              className={cn(
                "hidden h-11 items-center gap-2 rounded-full border-2 border-ink px-5 text-[0.82rem] font-semibold transition-[transform,box-shadow,background-color,color] duration-200 hover:-translate-y-0.5 sm:inline-flex",
                overHero
                  ? "bg-coral text-white shadow-[2px_2px_0_0_var(--color-paper)] hover:bg-paper hover:text-ink hover:shadow-[3px_3px_0_0_var(--color-paper)]"
                  : "bg-coral text-white shadow-[2px_2px_0_0_var(--color-ink)] hover:bg-paper hover:text-ink hover:shadow-[3px_3px_0_0_var(--color-ink)]",
              )}
            >
              Let&rsquo;s talk
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors lg:hidden",
                overHero ? "border-paper/30 text-paper hover:border-paper" : "border-ink/20 text-ink hover:border-ink",
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-night text-paper lg:hidden"
          >
            <div className="container-x flex h-[4.75rem] shrink-0 items-center justify-between">
              <Link href="/" aria-label="SOSIAL home" onClick={() => setMobileOpen(false)}>
                <Logo className="h-8" label="" variant="reversed" priority />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-paper/30 text-paper transition-colors hover:border-paper"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-6">
              <nav aria-label="Mobile primary" className="flex flex-col">
                {navigation.map((item, index) => (
                  <div key={item.href} className="border-b border-paper/12">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-4 font-display text-3xl font-semibold tracking-[-0.03em] transition-colors",
                        isActive(item.href)
                          ? "text-coral-soft"
                          : "text-paper hover:text-coral-soft",
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-[0.65rem] tracking-widest text-paper/35">
                        0{index + 1}
                      </span>
                    </Link>
                    {item.children ? (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-[0.78rem] leading-snug text-paper/55 transition-colors hover:text-paper"
                          >
                            {child.label}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => setMobileOpen(false)}
                          className="text-[0.78rem] leading-snug text-coral-soft"
                        >
                          All services
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ))}
              </nav>

              <div className="mt-10 flex flex-col gap-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-14 items-center justify-between rounded-full border-2 border-ink bg-coral px-6 text-[0.88rem] font-semibold text-white shadow-[3px_3px_0_0_var(--color-paper)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-paper)]"
                >
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={telHref}
                    className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-paper/25 text-[0.82rem] font-medium text-paper/85 transition-colors hover:border-paper"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                    Call
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-paper/25 text-[0.82rem] font-medium text-paper/85 transition-colors hover:border-paper"
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                    WhatsApp
                  </a>
                </div>
                <p className="text-[0.75rem] leading-relaxed text-paper/45">
                  Prefer to write?{" "}
                  <a className="text-paper/80 underline underline-offset-4" href={mailHref}>
                    {brand.email}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
