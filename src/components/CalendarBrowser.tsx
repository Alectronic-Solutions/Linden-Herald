"use client";

import { useMemo, useState } from "react";
import { FilterChip, FilterGroup, ResultCount } from "@/components/FilterChip";
import { events, eventCategories } from "@/data/events";
import { cn } from "@/lib/utils";

const categoryColor: Record<string, string> = {
  school: "border-herald",
  government: "border-cherry",
  community: "border-harvest",
  sports: "border-ink",
  agriculture: "border-herald-light",
};

export default function CalendarBrowser() {
  const [active, setActive] = useState("all");

  const grouped = useMemo(() => {
    const filtered = events
      .filter((e) => (active === "all" ? true : e.category === active))
      .sort((a, b) => a.date.localeCompare(b.date));

    const byMonth = new Map<string, typeof events>();
    for (const e of filtered) {
      const key = e.date.slice(0, 7);
      byMonth.set(key, [...(byMonth.get(key) ?? []), e]);
    }
    return Array.from(byMonth.entries());
  }, [active]);

  const filters = [{ slug: "all", name: "Everything" }, ...eventCategories];
  const count = grouped.reduce((n, [, list]) => n + list.length, 0);

  return (
    <>
      <div className="border-y border-ink py-4">
        <FilterGroup label="Filter events by category">
          {filters.map((f) => (
            <FilterChip key={f.slug} active={active === f.slug} onClick={() => setActive(f.slug)}>
              {f.name}
            </FilterChip>
          ))}
        </FilterGroup>
      </div>

      <ResultCount>
        {count} {count === 1 ? "event" : "events"} listed
      </ResultCount>

      <div className="mt-8 space-y-12">
        {grouped.map(([month, list]) => (
          <section key={month}>
            <h2 className="font-display text-2xl font-black uppercase tracking-[0.05em]">
              {new Date(`${month}-01T12:00:00`).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="rule-double mt-2 mb-6" />

            <ul className="space-y-5">
              {list.map((e) => {
                const d = new Date(`${e.date}T12:00:00`);
                return (
                  <li
                    key={e.id}
                    className={cn(
                      "grid gap-4 border-l-4 bg-newsprint-white p-5 sm:grid-cols-[5rem_1fr]",
                      categoryColor[e.category] ?? "border-rule-strong",
                    )}
                  >
                    <div className="text-center sm:border-r sm:border-rule sm:pr-4">
                      <p className="font-label text-[0.8rem] uppercase tracking-[0.16em] text-cherry">
                        {d.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="font-display text-4xl font-black leading-none">{d.getDate()}</p>
                      {e.endDate && (
                        <p className="mt-1 font-label text-[0.78rem] uppercase tracking-[0.1em] text-ink-faint">
                          thru {new Date(`${e.endDate}T12:00:00`).getDate()}
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold leading-snug">{e.title}</h3>
                      <p className="mt-1 font-label text-[0.8rem] uppercase tracking-[0.13em] text-ink-faint">
                        {e.time ? `${e.time} · ` : ""}
                        {e.location}
                      </p>
                      <p className="mt-2 font-body text-[1rem] leading-relaxed text-ink-muted">
                        {e.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {count === 0 && (
        <p className="mt-8 border border-rule bg-newsprint-white p-8 text-center font-body text-ink-muted">
          Nothing listed in that category right now. Send us your event and we will run it.
        </p>
      )}
    </>
  );
}
