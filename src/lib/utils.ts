export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...opts,
  });
}

export function formatShortDate(iso: string) {
  return formatDate(iso, { month: "short", day: "numeric", year: "numeric" });
}

/** Issue number counted from the paper's founding year. */
export function volumeFor(iso: string, founded = 1959) {
  return Number(iso.slice(0, 4)) - founded + 1;
}

/**
 * Prefixes the deployment base path onto a site-root asset path.
 *
 * next/image does not apply basePath when images.unoptimized is set, and plain
 * anchors never do, so anything under /public must go through this helper or it
 * 404s on a GitHub Pages project site. Empty base path (Cloudflare, local dev)
 * passes straight through.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
