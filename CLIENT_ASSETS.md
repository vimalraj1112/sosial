# Client assets and approvals

This is the current launch checklist for **SOSIAL**. The site is built and every route resolves; what remains is the material that must be supplied or approved before the placeholder content can be replaced.

**Legend:** 🔴 blocks launch · 🟠 needed before the relevant page is final · 🟢 nice to have

---

## 1. Brand 🟠

| Item | Current build | What we need |
| --- | --- | --- |
| Logo | Supplied `sosial` lockup extracted from the uploaded PDF, with primary, reversed and white PNG variants | An official vector master (SVG/AI/vector PDF) to replace the raster extraction and confirm clear-space rules |
| Palette | Violet `#8221FC`, Violet Deep `#6A0FD6`, Mid Violet `#B58CFD`, Soft Violet `#EFE6FE`, Night `#14141C`, Ink `#373743`, Cloud `#F6F5F9` | Confirm the applied palette matches the brand kit |
| Type | Plus Jakarta Sans (display), Inter (body), Playfair Display (editorial italics) | Confirm these are approved for web use |
| Favicon / OG | Rebuilt from the supplied lockup: `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/assets/brand/og.png` | Approve the social card or supply replacement artwork at 1200 x 630 |

The supplied PDF lockup is now live in the header, footer, splash, app icon and social card. The temporary orbit mark is no longer used. The remaining brand gap is a vector master for print and large-format production.

## 2. Contact details 🟢

The following details are now live in `src/data/brand.ts`:

- Public email: `sosial.solutions@gmail.com`
- Phone: `+91 91104 80590`
- WhatsApp: `9482861084` (`https://wa.me/919482861084`)
- Instagram: `@so.sial25`
- Location: Bengaluru, India
- Site URL: `https://sosial.solutions`

**Still needed:**

- [ ] Confirm the enquiry recipient inbox (the public form currently uses the configured Resend, Gmail/SMTP, webhook or file-sink adapter)
- [ ] Confirm the “from” address for Resend or the production email provider
- [ ] Working hours and timezone, if they should be published
- [ ] A reply-time promise, only if the team can keep it

The site deliberately publishes no working hours and no fixed reply-time commitment.

## 3. Social profiles 🟠

Instagram is live. LinkedIn and YouTube appear as muted, non-interactive icons because no confirmed profile URLs exist yet.

- [x] Instagram — `https://www.instagram.com/so.sial25/`
- [ ] LinkedIn
- [ ] YouTube
- [ ] Other (TikTok, Behance, Dribbble…)

Send the live URLs and they will become normal links. Tell us if any platform should be dropped.

## 4. Proof and portfolio 🟠

The portfolio currently contains **seven illustrative concept projects**, each clearly badged **“Illustrative concept · no verified results.”** No client names, logos or performance data are claimed.

For each real project you want published:

- [ ] Client name and written permission to publish
- [ ] One-line brief and what SOSIAL did
- [ ] The problem, approach and outcome in plain language
- [ ] Verified results with the measurement window and source (no rounded guesses)
- [ ] 2–4 images or a short clip, with usage rights
- [ ] A client quote (optional) with name, role and written approval

Until then, the seven concept pages remain labelled as concepts. Do not send logos or metrics “for look and feel” unless they can be published.

## 5. Testimonials 🟠

`/testimonials` is a labelled placeholder page and is set to `noindex`. The three cards are sample layouts with no attribution.

To publish real feedback, we need:

- [ ] Exact quote, approved in writing
- [ ] Name, role, company
- [ ] Photo (optional)
- [ ] Permission to use the quote and name on the site and in social posts
- [ ] The related project, so the claim can be judged in context

## 6. Team 🟠

Team cards show four disciplines with **“Profile pending.”** No names, biographies or portraits have been invented.

For each person:

- [ ] Name and role
- [ ] 2–3 sentence bio
- [ ] Portrait (high-resolution, consistent crop/background)
- [ ] LinkedIn URL (optional)

If the studio prefers not to name individuals, the role-only cards can stay and the pending labels can be removed.

## 7. Video and imagery 🟠

- [ ] Real studio reel or campaign film (MP4 + WebM, poster frame), with music and usage rights
- [ ] Or approve the current generated abstract film as a temporary placeholder
- [ ] Real photography/artwork to replace the SVG compositions (drop into `public/assets/images/` and update `src/data/media.ts`)
- [ ] Alt text for each meaningful image

The studio showreel is programmatically generated and has no audio. It is labelled “Placeholder footage — final brand film pending”. The homepage hero now uses an interactive arrow-field canvas rather than the generated film; the film remains available in the showreel section. All other artwork is illustrative.

## 8. Legal and compliance 🔴

- [ ] Privacy policy reviewed by the client’s adviser (what is collected, why, retention, processors, contact)
- [ ] Terms & conditions reviewed by the client’s adviser
- [ ] Company legal name, registration number and registered address, if they must appear
- [ ] Cookie/analytics position (the site currently sets no marketing cookies)
- [ ] Final consent wording for the enquiry form

The interim `/privacy` and `/terms` pages exist so the form and footer have working destinations. They should not be treated as final legal advice.

## 9. Analytics and operations 🟢

- [ ] Analytics provider and ID (GA4, Plausible, etc.)
- [ ] Consent banner requirement (EU/UK traffic)
- [ ] CRM or inbox for enquiries (Resend, HubSpot, Notion, Slack webhook…)
- [ ] Spam handling expectations beyond the built-in honeypot, time trap and rate limit

## 10. Launch details 🔴

- [ ] Final domain and `NEXT_PUBLIC_SITE_URL`
- [ ] DNS/hosting access or deployment target
- [ ] Email sending domain verification (Resend DNS records)
- [ ] Who signs off content, and who signs off the final build

The site URL is currently `https://sosial.solutions`.

---

## What is intentionally absent

These were considered and left out because publishing them would be dishonest without evidence:

- Client logo strip (replaced by a text list of platforms)
- Star ratings or review scores
- Awards, press mentions and “as seen in” logos
- Named alumni/employer logos
- Invented team members
- Hard performance claims (“+312% ROAS”) without a source and window
- Fixed fees, guaranteed results or reply-time promises
- Working hours that have not been confirmed

If any of these can be substantiated, send the evidence and we will add them properly.

---

## Known placeholders in the build

| Area | Placeholder state |
| --- | --- |
| Logo | Supplied PDF lockup live as raster PNGs; official vector master pending |
| Portfolio | Seven concept projects, labelled “Illustrative concept” |
| Testimonials | Three sample layouts; page is `noindex` |
| Team | Four role cards marked “Profile pending” |
| Studio showreel | Generated abstract film, no audio |
| Service artwork | Generated SVG compositions |
| Legal | Interim privacy and terms copy |
| Social | LinkedIn and YouTube muted until URLs are supplied |
| Email delivery | Resend, Gmail/SMTP or webhook when production env vars are configured; local file sink for preview |

Every placeholder is labelled in the interface. Nothing has been attributed to a real client, person or result that has not been supplied and approved.
