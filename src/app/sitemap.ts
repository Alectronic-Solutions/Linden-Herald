import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { articles } from "@/data/articles";
import { sections } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<[string, number, "daily" | "weekly" | "monthly"]> = [
    ["", 1, "daily"],
    ["/news", 0.9, "daily"],
    ["/obituaries", 0.8, "weekly"],
    ["/calendar", 0.8, "weekly"],
    ["/classifieds", 0.8, "weekly"],
    ["/archive", 0.9, "weekly"],
    ["/subscribe", 0.8, "monthly"],
    ["/advertise", 0.8, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.6, "monthly"],
    ["/privacy", 0.2, "monthly"],
    ["/terms", 0.2, "monthly"],
    ["/accessibility", 0.3, "monthly"],
    ["/corrections", 0.4, "monthly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...sections.map((s) => ({
      url: `${SITE_URL}/section/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/news/${a.slug}`,
      lastModified: new Date(`${a.date}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
