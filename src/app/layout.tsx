import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DemoBadge from "@/components/DemoBadge";
import { site } from "@/data/site";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const label = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.${site.domain}`),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Linden California newspaper",
    "San Joaquin County legal notices",
    "Linden Herald",
    "Linden Unified school board",
    "San Joaquin County agriculture news",
  ],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publisherSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: site.name,
    url: `https://www.${site.domain}`,
    foundingDate: String(site.founded),
    slogan: site.tagline,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: "929",
      addressLocality: site.mailing.city,
      addressRegion: site.mailing.state,
      postalCode: site.mailing.zip,
      addressCountry: "US",
    },
    areaServed: "San Joaquin County, California",
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <body className="min-h-screen antialiased no-js">
        {/* Reveal animations need JS. Drop the flag so the CSS fallback stops applying. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.body.classList.remove('no-js')",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-herald focus:px-4 focus:py-2 focus:font-label focus:uppercase focus:tracking-widest focus:text-newsprint-white"
        >
          Skip to content
        </a>
        <DemoBadge />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(publisherSchema) }}
        />
      </body>
    </html>
  );
}
