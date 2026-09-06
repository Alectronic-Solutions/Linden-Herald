import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  action?: string;
  blurb?: string;
};

export default function SectionHeading({ title, href, action, blurb }: Props) {
  return (
    <div className="mb-6">
      <div className="rule-double mb-3" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="font-display text-2xl font-black uppercase tracking-[0.06em] sm:text-[1.75rem]">
          {title}
        </h2>
        {href && action && (
          <Link
            href={href}
            className="font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-herald transition-colors hover:text-cherry"
          >
            {action} &rarr;
          </Link>
        )}
      </div>
      {blurb && (
        <p className="mt-1.5 max-w-2xl font-body text-[0.95rem] italic text-ink-muted">{blurb}</p>
      )}
    </div>
  );
}
