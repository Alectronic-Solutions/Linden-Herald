import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BackToTop from "@/components/BackToTop";
import { site, SITE_URL, ALLOW_INDEXING } from "@/data/site";
import { asset } from "@/lib/utils";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  publisher: site.name,
  keywords: [
    "Linden California newspaper",
    "Linden Herald",
    "San Joaquin County legal notices",
    "fictitious business name San Joaquin County",
    "Linden Unified school board",
    "San Joaquin County agriculture news",
    "Linden CA obituaries",
    "Linden community calendar",
    "subscribe Linden Herald",
    "San Joaquin County newspaper of general circulation",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} issue feed` }],
    },
  },
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "any" },
      { url: asset("/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/icon-192.png"), type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: asset("/apple-touch-icon.png"), sizes: "180x180" }],
  },
  manifest: asset("/manifest.webmanifest"),
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/",
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/og/default.jpg"],
  },
  // Kept out of search until this reaches the Herald's own domain.
  robots: ALLOW_INDEXING
    ? {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      }
    : { index: false, follow: false, nocache: true },
  category: "news",
};

export const viewport = {
  themeColor: "#1B4D3E",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publisherSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: site.name,
    url: SITE_URL,
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: { "@type": "NewsMediaOrganization", name: site.name },
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <body className="min-h-screen antialiased no-js">
        {/*
          Progressive-enhancement flag, cleared once React has hydrated, and the
          reader's stored text size restored before anything paints. This runs
          as the first node in the body, so a reader who needs the largest
          setting never sees a frame of the smallest.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.body.classList.remove('no-js');" +
              "try{var t=localStorage.getItem('lh-text-size');" +
              "if(t==='large'||t==='largest')document.documentElement.setAttribute('data-text-size',t)}catch(e){}",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-herald focus:px-4 focus:py-2 focus:font-label focus:uppercase focus:tracking-widest focus:text-newsprint-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(publisherSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
