"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import styles from "./scroll-cue.module.css";

export default function ScrollCue() {
  const { scrollY } = useScroll();
  const [dismissed, setDismissed] = useState(false);
  const reducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (position) => {
    if (position > 0 && !dismissed) setDismissed(true);
  });

  return (
    <motion.span
      className={styles.cue}
      initial={false}
      animate={{ opacity: dismissed ? 0 : 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1, y: reducedMotion || dismissed ? 0 : [0, 3, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 1.4 },
          y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
      >
        <path d="m6 7 6 5 6-5m-12 6 6 5 6-5" />
      </motion.svg>
    </motion.span>
  );
}
