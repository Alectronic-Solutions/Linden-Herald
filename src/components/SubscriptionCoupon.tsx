import { subscriptionRates } from "@/data/rates";
import { site, mailingAddressLines } from "@/data/site";

/**
 * A mail-in order form, printable on one sheet.
 *
 * The Herald takes subscriptions by check to the PO Box. That is how most of
 * them arrive, so the site should hand a reader something they can fill in and
 * post, not just a web form.
 */
export default function SubscriptionCoupon() {
  const blank = "border-b border-ink/50 pb-1";

  return (
    <div className="print-sheet border-[3px] border-dashed border-ink bg-newsprint-white p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3">
        <div>
          <p className="font-display text-2xl font-black leading-none">The Linden Herald</p>
          <p className="mt-1 font-label text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
            {site.tagline}
          </p>
        </div>
        <p className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cherry">
          Subscription Order Form
        </p>
      </div>

      <dl className="mt-6 space-y-5 font-body text-[0.95rem]">
        {[
          ["Name", "sm:w-full"],
          ["Delivery address", "sm:w-full"],
          ["City / State / ZIP", "sm:w-full"],
          ["Phone", "sm:w-2/3"],
          ["Email (optional)", "sm:w-2/3"],
        ].map(([label, width]) => (
          <div key={label}>
            <dt className="font-label text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
              {label}
            </dt>
            <dd className={`mt-2 h-6 ${blank} ${width}`} />
          </div>
        ))}
      </dl>

      <fieldset className="mt-7 border-t border-rule pt-5">
        <legend className="sr-only">Subscription type</legend>
        <p className="font-label text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
          Circle one
        </p>
        <ul className="mt-3 space-y-2.5 font-body text-[0.98rem]">
          {subscriptionRates.map((rate) => (
            <li key={rate.name} className="flex items-baseline gap-3">
              <span aria-hidden className="font-display text-lg leading-none text-ink-faint">
                &#9675;
              </span>
              <span>
                <strong className="font-display font-bold">{rate.name}</strong>{" "}
                <span className="font-display font-black text-herald">${rate.price}</span>{" "}
                <span className="text-ink-muted">{rate.unit}</span>
              </span>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="mt-7 grid gap-6 border-t-2 border-ink pt-5 sm:grid-cols-2">
        <div>
          <p className="font-label text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
            Enclose a check payable to
          </p>
          <p className="mt-1.5 font-display text-lg font-bold">The Linden Herald</p>
        </div>
        <div>
          <p className="font-label text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
            Mail to
          </p>
          <address className="mt-1.5 font-body text-[0.98rem] not-italic leading-relaxed">
            {mailingAddressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      </div>

      <p className="mt-6 border-t border-rule pt-4 font-body text-[0.85rem] leading-relaxed text-ink-muted">
        Questions? Call {site.phone}, {site.phoneNote.toLowerCase()}. Delivery begins with the next
        Thursday edition after we receive your order.
      </p>
    </div>
  );
}
