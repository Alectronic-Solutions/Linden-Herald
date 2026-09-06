import { cn } from "@/lib/utils";

/**
 * The Herald mark: a slab-serif H held between two rules, echoing the double
 * rule the site uses to break sections. Drawn as geometry rather than set in a
 * typeface so it stays identical from 16px to a print sheet.
 */
export default function Logo({
  size = 40,
  className,
  bg = "#1B4D3E",
  fg = "#FAF7F0",
  title = "The Linden Herald",
}: {
  size?: number;
  className?: string;
  bg?: string;
  fg?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
    >
      <rect width="64" height="64" rx="9" fill={bg} />
      <g fill={fg}>
        <rect x="14" y="13" width="36" height="2" />
        <rect x="14" y="48" width="36" height="2" />
        <rect x="20" y="20" width="6" height="24" />
        <rect x="38" y="20" width="6" height="24" />
        <rect x="20" y="29" width="24" height="5" />
        <rect x="17.5" y="20" width="11" height="2.2" />
        <rect x="17.5" y="41.8" width="11" height="2.2" />
        <rect x="35.5" y="20" width="11" height="2.2" />
        <rect x="35.5" y="41.8" width="11" height="2.2" />
      </g>
    </svg>
  );
}
