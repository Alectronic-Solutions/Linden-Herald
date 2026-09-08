"use client";

import { useEffect, useState } from "react";

/**
 * A single fade. This used framer-motion, which put the whole 37 KB library in
 * the root layout chunk and therefore on all twenty routes, including pages with
 * no other interactivity at all. A CSS transition does the same job.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      // Hidden from the tab order and from assistive technology while it is
      // faded out, so it is never a focus stop the reader cannot see.
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`no-print fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center border border-ink bg-newsprint-white text-ink shadow-page transition-all duration-300 hover:bg-ink hover:text-newsprint-white motion-reduce:transition-none sm:bottom-8 sm:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden focusable="false">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
}
