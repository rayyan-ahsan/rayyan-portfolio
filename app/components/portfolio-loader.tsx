"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => { if (!cancelled) setReady(true); };
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
    };
  }, []);

  // Mount the animated content only after decoding, so entrance animations and
  // the typewriter start together instead of running behind a loading overlay.
  if (ready) return children;

  return (
    <div className="portfolio-loader" role="status" aria-live="polite">
      <span className="portfolio-loader-mark" aria-hidden="true">✦</span>
      <p>Getting things ready…</p>
      <noscript>Please enable JavaScript to explore this portfolio.</noscript>
    </div>
  );
}
