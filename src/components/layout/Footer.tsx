import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  brand,
  footerLinks,
  mailHref,
  socialProfiles,
  telHref,
  whatsappHref,
  type SocialProfile,
} from "@/data/brand";
import { Logo } from "@/components/brand/Logo";
import { ReplayIntroLink } from "@/components/layout/SplashIntro";

const year = new Date().getFullYear();

/** Small, original glyphs so social profiles stay recognisable without a brand-icon dependency. */
function SocialGlyph({ name, className }: { name: SocialProfile["icon"]; className?: string }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.75V21h-4v-5.1c0-1.22-.02-2.8-1.8-2.8-1.8 0-2.07 1.34-2.07 2.72V21H9z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10.5 9.2 15.5 12l-5 2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/12 bg-night text-paper">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-light opacity-25" />

        <div className="container-x relative py-14 sm:py-16">
          <div className="grid gap-12 border-b border-paper/12 pb-12 lg:grid-cols-[1.05fr_1.95fr] lg:gap-20">
            <div>
              <Link href="/" aria-label="SOSIAL home" className="inline-flex text-paper">
                <Logo className="h-9" label="" variant="reversed" sizes="138px" />
              </Link>
              <p className="mt-6 max-w-sm font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.025em] text-paper/85 sm:text-[1.3rem]">
                Marketing, creative and production, working as one.
              </p>

              <div className="mt-7 flex items-center gap-2" aria-label="Social profiles">
                {socialProfiles.map((profile) => {
                  return profile.href ? (
                    <a
                      key={profile.label}
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`SOSIAL on ${profile.label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper/75 transition-colors hover:border-coral hover:bg-coral hover:text-white"
                    >
                      <SocialGlyph name={profile.icon} className="h-4 w-4" />
                    </a>
                  ) : (
                    <span
                      key={profile.label}
                      title={`${profile.label} profile link pending`}
                      className="flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-paper/20 text-paper/45"
                    >
                      <SocialGlyph name={profile.icon} className="h-4 w-4" />
                      <span className="sr-only">{profile.label} profile link pending</span>
                    </span>
                  );
                })}
              </div>
              <p className="mt-3 text-[0.66rem] leading-relaxed text-paper/30">
                Instagram is live. LinkedIn and YouTube will be added when confirmed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-10">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/35">
                  Services
                </p>
                <ul className="mt-4 space-y-2.5">
                  {footerLinks.services.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.83rem] leading-snug text-paper/65 transition-colors hover:text-coral-soft"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/35">
                  Company
                </p>
                <ul className="mt-4 space-y-2.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.83rem] leading-snug text-paper/65 transition-colors hover:text-coral-soft"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/35">
                  Contact
                </p>
                <ul className="mt-4 space-y-3 text-[0.83rem]">
                  <li>
                    <a
                      href={mailHref}
                      className="inline-flex items-center gap-2 break-all text-paper/65 transition-colors hover:text-coral-soft"
                    >
                      <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.7} />
                      {brand.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-2 text-paper/65 transition-colors hover:text-coral-soft"
                    >
                      <Phone aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.7} />
                      {brand.phoneLabel}
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-paper/65 transition-colors hover:text-coral-soft"
                    >
                      <MessageCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.7} />
                      WhatsApp
                      <ArrowUpRight aria-hidden="true" className="h-3 w-3" strokeWidth={1.8} />
                    </a>
                  </li>
                  <li className="flex items-start gap-2 text-paper/45">
                    <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.7} />
                    <span>{brand.location}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 text-[0.72rem] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {brand.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-coral-soft">
                  {link.label}
                </Link>
              ))}
              <ReplayIntroLink className="transition-colors hover:text-coral-soft" />
            </div>
          </div>
      </div>
    </footer>
  );
}
