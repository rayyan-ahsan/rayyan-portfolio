"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "motion/react";

export default function ScrollLink({ className, href, children }: {
  className: string;
  href: `#${string}`;
  children: ReactNode;
}) {
  const stopActive = useRef<() => void>(() => {});

  useEffect(() => () => stopActive.current(), []);

  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        stopActive.current();
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const destination = Math.max(0, window.scrollY + target.getBoundingClientRect().top - margin);

        // Avoid stacking the browser's smooth scroll on each animation frame.
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";

        const finish = () => {
          root.style.scrollBehavior = previousBehavior;
          window.removeEventListener("wheel", cancel);
          window.removeEventListener("touchstart", cancel);
          stopActive.current = () => {};
        };
        const animation = animate(window.scrollY, destination, {
          duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.45,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (top) => window.scrollTo(0, top),
          onComplete: finish,
        });
        function cancel() {
          animation.stop();
          finish();
        }
        stopActive.current = cancel;
        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("touchstart", cancel, { passive: true });
      }}
    >
      {children}
    </a>
  );
}
