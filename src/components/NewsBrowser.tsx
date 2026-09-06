"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import StoryCard from "@/components/StoryCard";
import { articles } from "@/data/articles";
import { sections } from "@/data/site";
import { cn } from "@/lib/utils";

const filters = [{ slug: "all", name: "All Sections" }, ...sections];

export default function NewsBrowser() {
  const params = useSearchParams();
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const s = params.get("section");
    if (s && sections.some((x) => x.slug === s)) setActive(s);
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => (active === "all" ? true : a.section === active))
      .filter((a) =>
        q
          ? `${a.title} ${a.deck} ${a.kicker} ${a.byline}`.toLowerCase().includes(q)
          : true,
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [active, query]);

  return (
    <>
      <div className="rule-hair sticky top-[3.25rem] z-30 -mx-5 bg-newsprint/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.slug}
                type="button"
                onClick={() => setActive(f.slug)}
                aria-pressed={active === f.slug}
                className={cn(
                  "border px-3 py-1.5 font-label text-[0.76rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                  active === f.slug
                    ? "border-ink bg-ink text-newsprint-white"
                    : "border-rule-strong text-ink-muted hover:border-ink hover:text-ink",
                )}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="lg:w-72">
            <label htmlFor="news-search" className="sr-only">
              Search stories
            </label>
            <input
              id="news-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search headlines"
              className="field py-2"
            />
          </div>
        </div>
      </div>

      <p className="mt-5 font-label text-[0.78rem] uppercase tracking-[0.16em] text-ink-faint">
        {results.length} {results.length === 1 ? "story" : "stories"}
      </p>

      <div className="mt-6 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((a) => (
            <motion.div
              key={a.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <StoryCard article={a} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {results.length === 0 && (
        <p className="mt-10 border border-rule bg-newsprint-white p-8 text-center font-body text-ink-muted">
          No stories match that search. Try another word, or call the newsroom and we will look it
          up in the bound volumes.
        </p>
      )}
    </>
  );
}
