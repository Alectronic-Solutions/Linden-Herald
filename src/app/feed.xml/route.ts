import { sortedIssues } from "@/data/archive";
import { site, SITE_URL, sectionName } from "@/data/site";
import { asset } from "@/lib/utils";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * The Herald is print-only, so the feed announces issues, not stories. Each
 * item is one printed edition, with its table of contents in the description
 * and the PDF attached as an enclosure.
 */
export async function GET() {
  const items = sortedIssues
    .map((issue) => {
      const url = `${SITE_URL}/archive/${issue.date}`;
      const contents = issue.contents
        .map((c) => `${sectionName(c.section)}: ${c.title}`)
        .join(" • ");
      const description = `Vol. ${issue.volume}, No. ${issue.number}. ${issue.pages} pages. ${contents}`;

      return `    <item>
      <title>${escapeXml(`${site.name}, ${issue.label}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <enclosure url="${SITE_URL}${asset(issue.file)}" length="${Math.round(
        issue.sizeMb * 1_048_576,
      )}" type="application/pdf" />
      <pubDate>${new Date(`${issue.date}T08:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()} ${escapeXml(site.name)}</copyright>
    <managingEditor>news@lindenherald.com (${escapeXml(site.name)})</managingEditor>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
