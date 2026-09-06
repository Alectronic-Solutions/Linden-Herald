import { latestArticles } from "@/data/articles";
import { site, SITE_URL, sectionName } from "@/data/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = latestArticles
    .map((a) => {
      const url = `${SITE_URL}/news/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.deck)}</description>
      <category>${escapeXml(sectionName(a.section))}</category>
      <dc:creator>${escapeXml(a.byline)}</dc:creator>
      <pubDate>${new Date(`${a.date}T08:00:00Z`).toUTCString()}</pubDate>
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
