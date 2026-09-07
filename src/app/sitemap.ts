import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { issues } from "@/data/archive";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<[string, number, "daily" | "weekly" | "monthly"]> = [
    ["", 1, "weekly"],
    ["/archive", 0.9, "weekly"],
    ["/subscribe", 0.9, "monthly"],
    ["/legal-notices", 0.9, "monthly"],
    ["/advertise", 0.8, "monthly"],
    ["/community", 0.7, "weekly"],
    ["/obituaries", 0.7, "weekly"],
    ["/calendar", 0.7, "weekly"],
    ["/classifieds", 0.7, "weekly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.6, "monthly"],
    ["/corrections", 0.4, "monthly"],
    ["/accessibility", 0.3, "monthly"],
    ["/privacy", 0.2, "monthly"],
    ["/terms", 0.2, "monthly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...issues.map((issue) => ({
      url: `${SITE_URL}/archive/${issue.date}`,
      lastModified: new Date(`${issue.date}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
