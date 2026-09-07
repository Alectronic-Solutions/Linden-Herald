import Link from "next/link";

/**
 * One of the things the site actually exists to do: take a subscription, take a
 * legal notice, take an ad. Used as a row of three on the front page.
 */
export default function ServiceCard({
  kicker,
  title,
  blurb,
  href,
  action,
  price,
}: {
  kicker: string;
  title: string;
  blurb: string;
  href: string;
  action: string;
  price?: string;
}) {
  return (
    <div className="flex h-full flex-col border-t-[3px] border-ink bg-newsprint-white p-6">
      <p className="kicker text-cherry">{kicker}</p>
      <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{title}</h3>
      {price && (
        <p className="mt-2 font-display text-3xl font-black text-herald">{price}</p>
      )}
      <p className="mt-3 flex-1 font-body text-[0.95rem] leading-relaxed text-ink-muted">{blurb}</p>
      <Link href={href} className="btn-primary mt-6 w-full text-xs">
        {action}
      </Link>
    </div>
  );
}
