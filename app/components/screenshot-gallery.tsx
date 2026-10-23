"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import styles from "./screenshot-gallery.module.css";

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
  note?: string;
  width: number;
  height: number;
};

export default function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewDirection, setPreviewDirection] = useState(1);
  const [previewTransitioning, setPreviewTransitioning] = useState(false);
  const [closing, setClosing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [direction, setDirection] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const noteId = useId();
  const isOpen = selected !== null;
  const image = selected === null ? null : screenshots[selected];
  const preview = screenshots[previewIndex];

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!closing) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    const timer = window.setTimeout(() => dialogRef.current?.close(), delay);
    return () => window.clearTimeout(timer);
  }, [closing]);

  function move(direction: number) {
    if (closing || transitioning || screenshots.length < 2 || selected === null) return;
    setDirection(direction);
    setTransitioning(true);
    const next = (selected + direction + screenshots.length) % screenshots.length;
    setSelected(next);
    setPreviewIndex(next);
  }

  function movePreview(travel: number) {
    if (previewTransitioning || screenshots.length < 2) return;
    setPreviewDirection(travel);
    setPreviewTransitioning(true);
    setPreviewIndex((current) => (current + travel + screenshots.length) % screenshots.length);
  }

  return (
    <>
        <figure className={styles.preview}>
          <div className={styles.thumbnailFrame}>
          <AnimatePresence initial={false} mode="wait" custom={previewDirection}>
          <motion.button
            key={preview.src}
            custom={previewDirection}
            variants={{
              enter: (travel: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : travel * 16 }),
              visible: { opacity: 1, x: 0 },
              exit: (travel: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : travel * -16 }),
            }}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={(phase) => {
              if (phase === "visible") setPreviewTransitioning(false);
            }}
            type="button"
            className={styles.thumbnail}
            onClick={() => setSelected(previewIndex)}
            aria-label={`Enlarge ${preview.caption}`}
            aria-haspopup="dialog"
          >
            <Image
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              sizes="(max-width: 720px) 80vw, 420px"
              className={styles.thumbnailImage}
            />
          </motion.button>
          </AnimatePresence>
          </div>
          <figcaption className={styles.caption}>
            <div>
              <span>{preview.caption}</span>
              {preview.note && <p>{preview.note}</p>}
            </div>
          </figcaption>
          <div className={styles.previewToolbar}>
            <button type="button" className={`${styles.enlarge} animated-underline`} onClick={() => setSelected(previewIndex)} aria-haspopup="dialog">
              Enlarge image <span aria-hidden="true">⤢</span>
            </button>
            {screenshots.length > 1 && (
              <div className={styles.previewNavigation}>
                <button type="button" className={`${styles.control} button-shine`} onClick={() => movePreview(-1)} aria-label="Previous preview image" disabled={previewTransitioning}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
                </button>
                <span aria-live="polite" aria-atomic="true">{previewIndex + 1} / {screenshots.length}</span>
                <button type="button" className={`${styles.control} button-shine`} onClick={() => movePreview(1)} aria-label="Next preview image" disabled={previewTransitioning}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
                </button>
              </div>
            )}
          </div>
        </figure>

      <dialog
        ref={dialogRef}
        className={`${styles.lightbox} ${expanded ? styles.expanded : ""} ${closing ? styles.closing : ""}`}
        aria-labelledby={titleId}
        aria-describedby={image?.note ? noteId : undefined}
        onClose={() => {
          setSelected(null);
          setClosing(false);
          setExpanded(false);
          setTransitioning(false);
        }}
        onCancel={(event) => {
          event.preventDefault();
          if (expanded) setExpanded(false);
          else setClosing(true);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setClosing(true);
        }}
        onKeyDown={(event) => {
          if (!closing && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {image && (
          <>
            <header className={styles.header}>
              <h3 id={titleId}>{image.caption}</h3>
              <button type="button" autoFocus className={`${styles.control} ${styles.close} button-shine`} onClick={() => setClosing(true)} disabled={closing}>
                <span className={styles.closeLabel}>Close</span>
                <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </header>
            <div className={styles.stage}>
              <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.button
                key={image.src}
                custom={direction}
                variants={{
                  enter: (travel: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : travel * 24 }),
                  visible: { opacity: 1, x: 0 },
                  exit: (travel: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : travel * -24 }),
                }}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{ duration: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={(phase) => {
                  if (phase === "visible") setTransitioning(false);
                }}
                type="button"
                className={styles.imageToggle}
                aria-label={expanded ? "Return to smaller preview" : "Expand preview to fill more of the screen"}
                aria-pressed={expanded}
                onClick={() => setExpanded(!expanded)}
                disabled={closing}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={expanded ? "98vw" : "(max-width: 720px) 96vw, 1100px"}
                  loading="eager"
                  className={styles.fullImage}
                />
              </motion.button>
              </AnimatePresence>
            </div>
            <footer className={styles.footer}>
              <div>
                {image.note && <p id={noteId}>{image.note}</p>}
                <span>{(selected ?? 0) + 1} of {screenshots.length}</span>
              </div>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={`${styles.control} ${styles.sizeControl} button-shine`}
                  onClick={() => setExpanded(!expanded)}
                  aria-pressed={expanded}
                  disabled={closing}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={expanded ? "M8 3v5H3m13-5v5h5M8 21v-5H3m13 5v-5h5" : "M8 3H3v5m13-5h5v5M8 21H3v-5m13 5h5v-5"} />
                  </svg>
                  {expanded ? "Smaller" : "Expand"}
                </button>
              {screenshots.length > 1 && (
                <div className={styles.navigation}>
                  <button type="button" className={`${styles.control} button-shine`} onClick={() => move(-1)} aria-label="Previous screenshot" disabled={closing || transitioning}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
                  </button>
                  <button type="button" className={`${styles.control} button-shine`} onClick={() => move(1)} aria-label="Next screenshot" disabled={closing || transitioning}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
                  </button>
                </div>
              )}
              </div>
            </footer>
          </>
        )}
      </dialog>
    </>
  );
}
