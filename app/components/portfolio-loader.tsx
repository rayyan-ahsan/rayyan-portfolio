"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import leafLogo from "@/assets/ac-leaf-logo.png";
import leaf from "@/assets/example-expand.png";
import button from "@/assets/say-hey-button.png";
import sign from "@/assets/wooden-sign.png";
import tag from "@/assets/developer-tag.png";
import dialogue from "@/assets/dialogue-box-high-res.png";
import cat from "@/assets/cat-character.png";
import portrait from "@/assets/rayyan-portrait.png";
import notely from "@/assets/notely-logo.png";
import guandan from "@/assets/guandan-thumbnail.png";
import valorant from "@/assets/valorant-thumbnail.png";
import books from "@/assets/books-slides-thumbnail.png";
import housing from "@/assets/house-prices-thumbnail.png";
import portfolio from "@/assets/portfolio-thumbnail.png";

const artwork = [leaf, button, sign, tag, dialogue, cat, portrait, notely, guandan, valorant, books, housing, portfolio];

export default function PortfolioLoader({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "waiting" | "exiting" | "ready">("loading");

  useEffect(() => {
    let cancelled = false;
    let finishing = false;
    const startedAt = performance.now();
    const previewLoader = process.env.NODE_ENV === "development"
      && new URLSearchParams(window.location.search).get("previewLoader") === "1";
    let minimumTimer: number | undefined;
    const finish = () => {
      if (cancelled || finishing) return;
      finishing = true;
      minimumTimer = window.setTimeout(() => {
        if (!cancelled) setPhase(previewLoader ? "waiting" : "exiting");
      }, Math.max(0, 800 - (performance.now() - startedAt)));
    };
    // A failed request or slow connection must never trap visitors in the loader.
    const timeout = window.setTimeout(finish, 12000);
    const images = artwork.map(({ src }) => {
      const image = new window.Image();
      image.src = src;
      return image.decode();
    });
    const styles = getComputedStyle(document.documentElement);
    const fonts = [
      document.fonts.load(`800 16px ${styles.getPropertyValue("--font-ac-title")}`),
      document.fonts.load(`500 16px ${styles.getPropertyValue("--font-ac-ui")}`),
    ];
    void Promise.allSettled([...images, ...fonts]).then(() => {
      window.clearTimeout(timeout);
      finish();
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.clearTimeout(minimumTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "waiting") return;
    const continueOnKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey
        || ["Tab", "Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
      event.preventDefault();
      setPhase("exiting");
    };
    window.addEventListener("keydown", continueOnKey);
    return () => window.removeEventListener("keydown", continueOnKey);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setPhase("ready"), reducedMotion ? 0 : 300);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  // Mount animations only once the assets are decoded and the loader has faded.
  if (phase === "ready") return children;

  return (
    <div className="portfolio-loader-shell" onClick={phase === "waiting" ? () => setPhase("exiting") : undefined}>
    <div className="portfolio-loader" data-exiting={phase === "exiting" || undefined} role="status" aria-live="polite">
      <div className="portfolio-loader-card">
        <div className="portfolio-loader-mark" aria-hidden="true">
          <Image src={leafLogo} alt="" width={56} height={56} preload />
        </div>
        <p className="portfolio-loader-title">Ray&apos;s Cranny</p>
        <div className="portfolio-loader-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>
      <noscript>Please enable JavaScript to explore this portfolio.</noscript>
    </div>
        {phase === "waiting" && (
          <button className="portfolio-loader-continue" type="button" onClick={() => setPhase("exiting")}>
            Click or press a key to continue
            <span>Development preview</span>
          </button>
        )}
    </div>
  );
}
