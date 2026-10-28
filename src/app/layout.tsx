import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { brand, siteUrl } from "@/data/brand";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FooterCta } from "@/components/layout/FooterCta";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SplashIntro } from "@/components/layout/SplashIntro";
import { SiteCursor } from "@/components/ui/SiteCursor";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const editorialFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const defaultTitle = "SOSIAL — Digital marketing, creative and production";
const defaultDescription =
  "Sosial is a digital marketing and creative brand in Bengaluru. Digital marketing, creative content and production, working as one.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | SOSIAL",
  },
  description: defaultDescription,
  applicationName: "SOSIAL",
  keywords: [
    "digital marketing agency Bengaluru",
    "social media marketing",
    "performance marketing",
    "branding and creative strategy",
    "website development",
    "local digital visibility",
    "video production",
    "photography studio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SOSIAL",
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: "/assets/brand/og.png", width: 1200, height: 630, alt: "SOSIAL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/assets/brand/og.png"],
  },
  icons: {
    icon: [
      { url: "/assets/brand/sosial-app-icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#14141C",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SOSIAL",
  description: brand.shortDescription,
  url: siteUrl,
  email: brand.email,
  telephone: brand.phoneLabel,
  slogan: brand.tagline,
  logo: `${siteUrl}/assets/brand/sosial-app-icon.png`,
  image: `${siteUrl}/assets/brand/og.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: "Bengaluru, India",
  sameAs: ["https://www.instagram.com/so.sial25/"],
  knowsAbout: [
    "Social media marketing",
    "Paid advertising",
    "Performance marketing",
    "Branding and creative strategy",
    "Website development",
    "Local digital visibility",
    "Branding and marketing production",
    "Indoor production",
    "Outdoor production",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${editorialFont.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="grain min-h-screen bg-paper text-ink antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-night px-4 py-3 text-sm text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>

        <SplashIntro />
        <SmoothScroll />

        <div id="site-content">
          <Header />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <FooterCta />
          <Footer />
        </div>

        <SiteCursor />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
