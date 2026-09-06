"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Article } from "@/data/articles";
import { asset, formatDate } from "@/lib/utils";

/**
 * Full-bleed lead story. The image drifts slower than the page and the scrim
 * deepens as it goes, so the headline stays readable over any photograph.
 */
export default function ParallaxHero({ article }: { article: Article }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  if (!article.image) return null;

  return (
    <section
      ref={ref}
      aria-labelledby="lead-story"
      className="relative isolate h-[78vh] min-h-[32rem] w-full overflow-hidden bg-ink"
    >
      <motion.div
        style={reduce ? undefined : { y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={asset(article.image)}
          alt={article.imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Scrim: dark at the foot, a touch at the head, so type holds over anything */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-transparent"
      />

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: fade }}
        className="absolute inset-x-0 bottom-0"
      >
        <div className="wrap pb-12 sm:pb-16">
          <div className="max-w-3xl">
            <p className="kicker text-harvest-light">{article.kicker}</p>
            <h2
              id="lead-story"
              className="mt-3 font-display text-[2.4rem] font-black leading-[1.02] tracking-[-0.02em] text-newsprint-white drop-shadow-[0_2px_12px_rgba(20,17,15,0.55)] sm:text-[3.6rem] lg:text-[4.4rem]"
            >
              <Link href={`/news/${article.slug}`} className="transition-colors hover:text-harvest-light">
                {article.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-2xl font-display text-lg leading-relaxed text-newsprint-deep/90 sm:text-xl">
              {article.deck}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="font-label text-[0.78rem] uppercase tracking-[0.16em] text-newsprint-deep/70">
                By {article.byline} &middot; {formatDate(article.date)}
              </p>
              <Link
                href={`/news/${article.slug}`}
                className="font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-harvest-light transition-colors hover:text-newsprint-white"
              >
                Read the story &rarr;
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {article.credit && (
        <span className="absolute bottom-2 right-3 font-label text-[0.62rem] uppercase tracking-[0.14em] text-newsprint-deep/45">
          {article.credit}
        </span>
      )}
    </section>
  );
}
