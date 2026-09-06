import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ContactCard from "@/components/ContactCard";
import { policyList, type Policy } from "@/data/policies";

export default function PolicyPage({ policy }: { policy: Policy }) {
  return (
    <div className="wrap py-10">
      <PageHeader kicker={policy.kicker} title={policy.title} blurb={policy.blurb} />

      <div className="grid gap-12 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <p className="font-label text-[0.76rem] uppercase tracking-[0.16em] text-ink-faint">
            Last updated {policy.updated}
          </p>

          <div className="mt-8 space-y-10">
            {policy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-black drop-rule">{section.heading}</h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((p, i) => (
                    <p key={i} className="font-body text-[1.02rem] leading-[1.75] text-ink-soft">
                      {p}
                    </p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-5 space-y-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 font-body text-[1rem] leading-relaxed text-ink-soft"
                      >
                        <span aria-hidden className="mt-1 text-harvest">
                          &#9670;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>

        <aside className="lg:col-span-4">
          <nav aria-label="Policies" className="border border-ink bg-newsprint-white p-6">
            <h2 className="kicker text-herald">Policies</h2>
            <ul className="mt-4 divide-y divide-rule">
              {policyList.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    aria-current={p.slug === policy.slug ? "page" : undefined}
                    className={
                      p.slug === policy.slug
                        ? "block py-2.5 font-display text-[1.02rem] font-bold text-herald"
                        : "block py-2.5 font-display text-[1.02rem] text-ink-muted transition-colors hover:text-ink"
                    }
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ContactCard variant="compact" heading="Questions about any of this?" className="mt-6" />
        </aside>
      </div>
    </div>
  );
}
