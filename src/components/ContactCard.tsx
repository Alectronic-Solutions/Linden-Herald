import { site, mailingAddressLines } from "@/data/site";
import { cn } from "@/lib/utils";

type Props = {
  /** full: bordered card with phone, note and address. compact: phone and address only, no border. inline: one line. */
  variant?: "full" | "compact" | "inline";
  heading?: string;
  showAddress?: boolean;
  className?: string;
};

export default function ContactCard({
  variant = "full",
  heading = "Reach the newsroom",
  showAddress = true,
  className,
}: Props) {
  if (variant === "inline") {
    return (
      <p className={cn("font-body text-[0.96rem] text-ink-muted", className)}>
        Call{" "}
        <a href={site.phoneHref} className="font-semibold text-ink underline link-underline">
          {site.phone}
        </a>{" "}
        any hour, or write to {site.mailing.line1}, {site.mailing.city}, {site.mailing.state}{" "}
        {site.mailing.zip}.
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("border-l-4 border-herald pl-5", className)}>
        <p className="kicker text-herald">{heading}</p>
        <a
          href={site.phoneHref}
          className="mt-1.5 block font-display text-2xl font-black leading-none transition-colors hover:text-herald"
        >
          {site.phone}
        </a>
        <p className="mt-1 font-label text-[0.72rem] uppercase tracking-[0.12em] text-ink-faint">
          {site.phoneNote}
        </p>
        {showAddress && (
          <address className="mt-3 font-body text-[0.93rem] not-italic leading-relaxed text-ink-muted">
            {site.mailing.line1}, {site.mailing.city}, {site.mailing.state} {site.mailing.zip}
          </address>
        )}
      </div>
    );
  }

  return (
    <div className={cn("border border-ink bg-newsprint-white p-7", className)}>
      <p className="kicker text-herald">{heading}</p>
      <a
        href={site.phoneHref}
        className="mt-2 block font-display text-4xl font-black leading-none transition-colors hover:text-herald"
      >
        {site.phone}
      </a>
      <p className="mt-2 font-body text-[0.94rem] text-ink-muted">{site.phoneNote}</p>
      {showAddress && (
        <address className="mt-6 border-t border-rule pt-5 font-body text-[0.98rem] not-italic leading-relaxed text-ink-muted">
          <span className="kicker block text-ink-faint">Mailing address</span>
          <span className="mt-2 block">
            {mailingAddressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </address>
      )}
    </div>
  );
}
