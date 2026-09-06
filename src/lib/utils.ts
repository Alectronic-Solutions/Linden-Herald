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
