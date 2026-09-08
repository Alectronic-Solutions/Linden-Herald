import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Page metadata that cannot forget its canonical, its social card or the feed.
 *
 * Next merges metadata shallowly, one top-level key at a time, and that bit
 * three separate ways here:
 *
 *   - The root layout set `alternates.canonical` to "/". Any page that omitted
 *     `alternates` inherited it, so /about, /contact, /calendar, /classifieds
 *     and /obituaries each told search engines they were duplicates of the
 *     front page.
 *   - A page that set only `openGraph.images` replaced the whole `openGraph`
 *     object, losing `og:url` and taking the site-wide title and description
 *     onto a page they did not describe.
 *   - A page that set `alternates.canonical` replaced the whole `alternates`
 *     object, dropping the RSS `types` entry, so the feed was undiscoverable on
 *     every page except the home page.
 *
 * Deriving all three from one `path` removes the class of bug rather than the
 * five instances of it.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/og/default.jpg",
}: {
  title: string;
  description: string;
  /** Site-root path, no trailing slash, e.g. "/legal-notices". */
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} issue feed` }],
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      locale: "en_US",
      siteName: site.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} — ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
