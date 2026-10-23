"use client";

import { useState, type ReactNode } from "react";
import { motion, useDragControls, useMotionValue, useReducedMotion, useTransform } from "motion/react";

export default function PinnedProjectCard({ children, className }: { children: ReactNode; className: string }) {
  const controls = useDragControls();
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-60, 0, 60], [-3, 0, 3]);
  const [dragging, setDragging] = useState(false);
  const [raised, setRaised] = useState(false);

  return (
    <motion.div
      className={className}
      data-card-raised={raised || undefined}
      drag={!reducedMotion}
      dragListener={false}
      dragControls={controls}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.12}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 360, bounceDamping: 24 }}
      onDragStart={() => {
        setDragging(true);
        setRaised(true);
      }}
      onDragEnd={() => setDragging(false)}
      onDragTransitionEnd={() => setRaised(false)}
      onPointerDown={(event) => {
        if (reducedMotion || event.pointerType !== "mouse" || event.button !== 0) return;
        if ((event.target as Element).closest("[data-card-handle]")) controls.start(event);
      }}
      animate={{ scale: dragging ? 1.015 : 1 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      style={{ x, rotate: reducedMotion ? 0 : rotate, transformOrigin: "50% 0", zIndex: raised ? 2 : 0 }}
    >
      {children}
    </motion.div>
  );
}
