import type { MetadataRoute } from "next";
import { SITE_URL, ALLOW_INDEXING } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    // Preview deployment: keep it out of search entirely.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
