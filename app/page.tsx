"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MotionConfig, motion, useMotionValue, useReducedMotion, useSpring, Variants, Transition } from "motion/react";

import acLeafExpanded from "@/assets/example-expand.png";
import sayHeyButton from "@/assets/say-hey-button.png";
import woodenSign from "@/assets/wooden-sign.png";
import developerTag from "@/assets/developer-tag.png";
import dialogueBox from "@/assets/dialogue-box-high-res.png";
import catCharacter from "@/assets/cat-character.png";
import Projects from "./components/projects";
import About from "./components/about";
import ScrollLink from "./components/scroll-link";
import ScrollCue from "./components/scroll-cue";
import PortfolioLoader from "./components/portfolio-loader";

const EMAIL = "rayyan@rayyanahsan.com";
const LINKEDIN = "https://www.linkedin.com/in/rayyanahsan/";

const LEAF_TILE_PX = 76;
const EXPANDED_RATIO = acLeafExpanded.width / acLeafExpanded.height;
const EXPANDED_PX = Math.round(LEAF_TILE_PX * EXPANDED_RATIO);

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

const slideInRight = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const catBounce: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 14, delay: 0.9 },
  },
};

const tagPop: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 20, delay: 0.5 },
  },
};

const LABEL_TILT_DEG = -8;
const labelPop: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: LABEL_TILT_DEG },
  show: {
    opacity: 1,
    scale: 1,
    rotate: LABEL_TILT_DEG,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.75 },
  },
};

const catSway = {
  rotate: [-1.5, 1.5, -1.5] as number[],
  transition: {
    duration: 2.8,
    repeat: Infinity,
    ease: "easeInOut",
  } satisfies Transition,
};

// ── Typewriter component ──────────────────────────────────────────────────────
interface TypewriterTextProps {
  text: string;
  delay?: number;
}

function TypewriterText({ text, delay = 0 }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let i = 0;
      setDisplayed("");
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 38);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [delay, reducedMotion, text]);

  return (
    <p className="dialogue-text">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reducedMotion ? text : displayed}</span>
      {!reducedMotion && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ marginLeft: 2 }}
          aria-hidden="true"
        >
          ▌
        </motion.span>
      )}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  return <PortfolioLoader><HeroSection /></PortfolioLoader>;
}

function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [showTagHint, setShowTagHint] = useState(false);
  const [tagHintDismissed, setTagHintDismissed] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setShowTagHint(localStorage.getItem("portfolio-developer-tag-dragged") !== "1");
      } catch {
        setShowTagHint(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const tagRef = useRef<HTMLDivElement>(null);
  const tagGrab = useRef({ x: 0, y: 0, angle: 0, rotation: 0 });
  const tagOffsetX = useMotionValue(0);
  const tagOffsetY = useMotionValue(0);
  const tagX = useSpring(tagOffsetX, { stiffness: 300, damping: 16 });
  const tagY = useSpring(tagOffsetY, { stiffness: 300, damping: 16 });
  const tagAngle = useMotionValue(0);
  const tagRotate = useSpring(tagAngle, { stiffness: 300, damping: 16 });

  function angleFromTagAnchor(point: { x: number; y: number }) {
    const rect = tagRef.current!.getBoundingClientRect();
    const anchorX = rect.left + window.scrollX + rect.width * 0.127;
    const anchorY = rect.top + window.scrollY + rect.height * 0.621;
    return Math.atan2(point.y - anchorY, point.x - anchorX);
  }

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-root {
          --content-drop: 24px;
          min-height: 100vh;
          width: 100%;
          background-color: #f5ead6;
          font-family: var(--font-ac-ui), system-ui, sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 28px 36px 0;
          position: relative;
          z-index: 10;
          pointer-events: none;
        }

        .leaf-logo-clip {
          pointer-events: auto;
          height: ${LEAF_TILE_PX}px;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          cursor: pointer;
          display: block;
          background: transparent;
          border: none;
          padding: 0;
          margin: 0;
          appearance: none;
          -webkit-tap-highlight-color: transparent;
        }
        .leaf-logo-clip:focus-visible {
          outline: 3px solid #8b7bcc;
          outline-offset: 2px;
        }
        .leaf-logo-clip::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 2px solid #8d89c4;
          border-radius: inherit;
          pointer-events: none;
        }

        .leaf-logo-clip img {
          height: ${LEAF_TILE_PX}px;
          width: ${EXPANDED_PX}px;
          max-width: none;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        .say-hey-btn {
          pointer-events: auto;
          position: relative;
          display: inline-block;
          cursor: pointer;
          line-height: 0;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .say-hey-img {
          width: 240px;
          height: auto;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }
        .say-hey-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-ac-ui), system-ui, sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #ffffff;
          letter-spacing: 0.02em;
          line-height: 1;
          padding-bottom: 4px;
          pointer-events: none;
          text-shadow: 0 1px 0 rgba(0,0,0,0.08);
        }

        .hero-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: calc(12px + var(--content-drop)) 24px 0;
          position: relative;
          min-height: 0;
        }

        .sign-wrapper {
          position: relative;
          width: min(834px, 78vw, calc(42vh * ${(woodenSign.width / woodenSign.height).toFixed(3)}));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wood-sign-image { position: relative; z-index: 1; width: 100%; }
        .wood-sign-float {
          will-change: transform;
          animation: sign-float 3s ease-in-out infinite;
        }
        @keyframes sign-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0.1deg); }
          50% { transform: translate3d(0, -4px, 0) rotate(0.1deg); }
        }
        .wood-img {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        .tag-image {
          position: absolute;
          top: -40%;
          right: -5%;
          z-index: 5;
          width: 48%;
          cursor: grab;
          touch-action: none;
          user-select: none;
          pointer-events: none;
        }
        .tag-image:active { cursor: grabbing; }
        .tag-drag-hint {
          display: none;
          position: absolute;
          left: calc(100% + 4px);
          top: 40%;
          width: 110px;
          color: #716794;
          font: 500 .85rem var(--font-ac-ui), sans-serif;
          pointer-events: none;
          user-select: none;
        }
        .tag-drag-hint span { display: block; margin-left: 22px; white-space: nowrap; }
        .tag-drag-hint svg { display: block; width: 90px; height: 65px; overflow: visible; }
        @media (min-width: 1024px) and (hover: hover) and (pointer: fine) {
          .tag-drag-hint { display: block; }
        }
        .tag-drag-body {
          filter: drop-shadow(0 6px 10px rgba(0,0,0,0.18));
        }
        .tag-img {
          width: 100%;
          height: auto;
          display: block;
          pointer-events: auto;
          clip-path: polygon(1.3% 48%, 13% 28%, 90.8% 5.5%, 98.6% 69%, 22% 92.6%, 5.4% 81.6%);
          user-select: none;
          -webkit-user-drag: none;
        }

        .dialogue-section {
          width: 100%;
          max-width: min(961px, 78vw, calc(29vh * ${(dialogueBox.width / dialogueBox.height).toFixed(3)}));
          margin: 0 auto;
          padding: 12px 0 20px;
          position: relative;
        }

        .dialogue-bubble-wrapper {
          width: 100%;
          position: relative;
          aspect-ratio: ${dialogueBox.width} / ${dialogueBox.height};
        }

        .dialogue-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }

        /* Position "Rayyan" label over the baked-in purple pill (top-left of bubble) */
        .dialogue-label {
          position: absolute;
          top: 1%;
          left: 2.5%;
          width: 16%;
          height: 19%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-ac-title), system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(1rem, 1.5vw, 1.45rem);
          color: #ffffff;
          letter-spacing: 0.01em;
          line-height: 1;
          z-index: 3;
          pointer-events: none;
          transform-origin: 50% 50%;
        }

        /* Centre the introduction within the cream body of the bubble. */
        .dialogue-text-area {
          position: absolute;
          top: 20%;
          left: 6%;
          right: 6%;
          bottom: 16%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .dialogue-text {
          font-family: var(--font-ac-title), system-ui, sans-serif;
          font-size: clamp(1.2rem, 2vw, 2rem);
          font-weight: 800;
          color: #2a2018;
          line-height: 1.25;
          text-align: center;
          white-space: pre-line;
          letter-spacing: 0.005em;
        }

        .cat-character {
          position: absolute;
          right: -12%;
          bottom: 0;
          width: 16%;
          min-width: 90px;
          z-index: 4;
        }
        .cat-img {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        .footer-links {
          position: relative;
          display: flex;
          gap: 24px;
          padding: 0 36px calc(32px - var(--content-drop));
        }
        .footer-links a {
          font-family: var(--font-ac-ui), system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #5a4e3a;
          text-decoration: none;
          transition: background-size 0.24s ease, color 0.2s;
          letter-spacing: 0.01em;
        }
        .footer-links a:hover {
          color: #4a3a78;
        }
        .footer-links .projects-jump { margin-left: auto; color: #65578b; }

        @media (min-width: 721px) and (max-height: 900px) {
          .say-hey-img { width: clamp(180px, 22vw, 240px); }
          .say-hey-text { font-size: clamp(0.95rem, 1.4vw, 1.1rem); }
          .hero-center {
            --header-clearance: clamp(72px, 10vh, 96px);
            padding-top: var(--header-clearance);
            min-height: calc(34vh + var(--header-clearance));
          }
          .sign-wrapper {
            width: min(834px, 78vw, calc(34vh * ${(woodenSign.width / woodenSign.height).toFixed(3)}));
          }
        }

        @media (max-width: 720px) {
          .hero-root { min-height: 100svh; }
          .topbar { padding: 18px 18px 0; }
          .say-hey-img { width: 180px; }
          .say-hey-text { font-size: 0.9rem; }
          .hero-center {
            flex: 0 0 auto;
            padding: clamp(72px, 14svh, 112px) 24px 28px;
          }
          .dialogue-section {
            max-width: 94vw;
            padding: 12px 12px 18px;
          }
          .cat-character {
            width: 14%;
            min-width: 0;
            right: -1%;
            top: 50%;
            bottom: auto;
            translate: 0 -50%;
          }
          .dialogue-bubble-wrapper { container-type: inline-size; }
          .dialogue-label { font-size: clamp(0.45rem, 3.4cqw, 0.9rem); }
          .dialogue-text { font-size: clamp(0.625rem, 4.8cqw, 1.2rem); }
          .footer-links {
            margin-top: auto;
            padding: 16px 18px max(16px, env(safe-area-inset-bottom));
            gap: 16px;
          }
        }
      `}</style>

      <main
        onDragStartCapture={(event) => {
          const target = event.target;
          if (target instanceof Element && target.closest("img, a, button")) {
            event.preventDefault();
          }
        }}
      >
      <h1 className="sr-only">Rayyan Ahsan — Full-stack developer</h1>
      <div className="hero-root" id="top">

        {/* Topbar */}
        <div className="topbar">
          <motion.div
            variants={fadeIn(0)}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
          >
            <motion.button
              type="button"
              className="leaf-logo-clip button-shine"
              aria-label="Rayyan's Portfolio — Ray's Cranny"
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileFocus="hover"
              variants={{
                rest: {
                  width: LEAF_TILE_PX,
                  transition: { type: "spring", stiffness: 280, damping: 24 },
                },
                hover: {
                  width: EXPANDED_PX,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <Image
                src={acLeafExpanded}
                alt=""
                height={LEAF_TILE_PX}
                width={EXPANDED_PX}
                priority
              />
            </motion.button>
          </motion.div>

          <motion.a
            className="say-hey-btn button-shine"
            href={`mailto:${EMAIL}`}
            variants={slideInRight(0.2)}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Image
              src={sayHeyButton}
              alt=""
              className="say-hey-img"
              priority
            />
            <span className="say-hey-text">Say Hey to Ray!</span>
          </motion.a>
        </div>

        {/* Hero center: wooden sign + developer tag */}
        <div className="hero-center">
          <div className="sign-wrapper wood-sign-float">
            <motion.div
              className="wood-sign-image"
              variants={fadeUp(0.3)}
              initial={reducedMotion ? false : "hidden"}
              animate="show"
            >
                <Image
                  src={woodenSign}
                  alt="Welcome to Rayyan's Portfolio"
                  priority
                  className="wood-img"
                />
            </motion.div>

            <motion.div
              className="tag-image"
              ref={tagRef}
              variants={tagPop}
              initial={reducedMotion ? false : "hidden"}
              animate="show"
              onPanStart={(_, info) => {
                setTagHintDismissed(true);
                setShowTagHint(false);
                try { localStorage.setItem("portfolio-developer-tag-dragged", "1"); } catch { /* Storage may be unavailable. */ }
                tagGrab.current = {
                  x: tagX.get(),
                  y: tagY.get(),
                  angle: angleFromTagAnchor(info.point),
                  rotation: tagRotate.get(),
                };
              }}
              onPan={(_, info) => {
                const x = 80 * Math.tanh((tagGrab.current.x + info.offset.x * 0.45) / 80);
                const y = 60 * Math.tanh((tagGrab.current.y + info.offset.y * 0.45) / 60);
                tagOffsetX.set(x);
                tagOffsetY.set(y);
                const angle = angleFromTagAnchor(info.point);
                const delta = angle - tagGrab.current.angle;
                tagGrab.current.rotation += Math.atan2(Math.sin(delta), Math.cos(delta)) * 180 / Math.PI;
                tagGrab.current.angle = angle;
                tagAngle.set(tagGrab.current.rotation);
              }}
              onPanEnd={() => {
                tagOffsetX.set(0);
                tagOffsetY.set(0);
                // Discard full turns without changing the visible orientation.
                const rotation = ((tagRotate.get() + 180) % 360 + 360) % 360 - 180;
                tagAngle.jump(rotation);
                tagRotate.jump(rotation);
                tagAngle.set(0);
              }}
            >
              <motion.div className="tag-drag-body" style={{ x: tagX, y: tagY, rotate: tagRotate, transformOrigin: "12.7% 62.1%" }}>
              <Image
                src={developerTag}
                alt="Full-Stack Developer"
                className="tag-img"
                draggable={false}
                priority
              />
              </motion.div>
              <motion.div
                className="tag-drag-hint"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: showTagHint ? 1 : 0 }}
                transition={{ duration: 0.25, delay: showTagHint && !tagHintDismissed ? 1.5 : 0 }}
              >
                <span>Drag me</span>
                <svg viewBox="0 0 90 65" fill="none">
                  <path d="M65 8C76 44 36 59 0 37m0 0 4 13M0 37l14-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Dialogue section: bubble + cat */}
        <motion.div
          className="dialogue-section"
          variants={fadeUp(0.7)}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
        >
          <div className="dialogue-bubble-wrapper">
            <Image
              src={dialogueBox}
              alt=""
              className="dialogue-bg"
              priority
              sizes="(max-width: 720px) 80vw, 60vw"
            />
            <motion.div
              className="dialogue-label"
              variants={labelPop}
              initial={reducedMotion ? false : "hidden"}
              animate="show"
            >
              Rayyan
            </motion.div>
            <div className="dialogue-text-area">
              <TypewriterText
                text={"Hi I'm Rayyan,\na passionate full-stack developer!"}
                delay={1.1}
              />
            </div>
          </div>

          <motion.div
            className="cat-character"
            variants={catBounce}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
          >
            <motion.div animate={reducedMotion ? { rotate: 0 } : catSway}>
              <Image
                src={catCharacter}
                alt="Rayyan's character"
                className="cat-img"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer links */}
        <motion.div
          className="footer-links"
          variants={fadeIn(1.1)}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
        >
          <a className="animated-underline" href={`mailto:${EMAIL}`}>Email</a>
          <a className="animated-underline" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <ScrollLink className="projects-jump animated-underline" href="#projects">Projects <span aria-hidden="true">↓</span></ScrollLink>
          <ScrollCue />
        </motion.div>
      </div>
      <About />
      <Projects />
      </main>
    </MotionConfig>
  );
}
