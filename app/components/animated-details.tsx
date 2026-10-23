"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function AnimatedDetails({ label, className, children }: {
  label: string;
  className: string;
  children: ReactNode;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <details ref={detailsRef} className={className} open={open}>
      <summary
        data-underline-trigger
        aria-expanded={expanded}
        onClick={(event) => {
          event.preventDefault();
          if (!expanded) setOpen(true);
          else detailsRef.current?.querySelectorAll("video").forEach((video) => video.pause());
          setExpanded(!expanded);
        }}
      >
        <span className="animated-underline">{label}</span> <span aria-hidden="true">+</span>
      </summary>
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.23, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (!expanded) setOpen(false);
        }}
        inert={!expanded}
        style={{ overflow: "hidden" }}
      >
        <div style={{ display: "flow-root" }}>{children}</div>
      </motion.div>
    </details>
  );
}
