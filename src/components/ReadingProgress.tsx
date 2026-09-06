"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline progress rule across the top of an article. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 260, damping: 34, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="no-print fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-cherry"
    />
  );
}
