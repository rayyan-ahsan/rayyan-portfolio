"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import portrait from "@/assets/rayyan-portrait.png";
import ScrollLink from "./scroll-link";
import AnimatedDetails from "./animated-details";
import styles from "./about.module.css";

const skills = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "Go", "Java", "Lua"] },
  { label: "Web & data", items: ["HTML", "CSS", "React", "Vue.js", "Next.js", "Django", "PostgreSQL", "SQLite"] },
  { label: "Tools & design", items: ["Git", "Docker", "Photoshop"] },
];

export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className={styles.section}>
      <motion.svg
        className={styles.divider}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reducedMotion ? 0 : 0.45 }}
      >
        <path d="M0 24Q180 0 360 24T720 24T1080 24T1440 24V64H0Z" fill="var(--about-background, #eee2c9)" />
        <path d="M0 24Q180 0 360 24T720 24T1080 24T1440 24" fill="none" stroke="#d1bfa0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </motion.svg>
      <motion.div
        className={styles.panel}
        initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <div className={styles.portrait}>
          <Image src={portrait} alt="Rayyan smiling and holding up a peace sign" className={styles.portraitImage} sizes="(max-width: 720px) 118px, 164px" />
        </div>
        <div className={styles.intro}>
          <span className={styles.label}>Behind the projects</span>
          <h2 id="about-title">A little about me.</h2>
          <p>
            I&apos;m Rayyan, a full-stack developer with an interest in design and
            interactive software. My projects include collaborative tools, game
            lobbies, and data visualisations. I enjoy learning new technologies
            and experimenting with ideas through my own projects.
          </p>
          <p>
            I work on both development and visual design, with attention to
            usability and detail. I edited most of this site&apos;s artwork in
            Photoshop and use the portfolio to explore different styles and
            interactions.
          </p>
          <div className={styles.introActions}>
          <span className={styles.availability}>Open to developer opportunities</span>
          <ScrollLink href="#projects" className={`${styles.projectLink} animated-underline`}>
            Explore my projects <span aria-hidden="true">↓</span>
          </ScrollLink>
          </div>
        </div>
        <div className={styles.skills}>
          <h3>What I work with</h3>
          {skills.map((group) => (
            <div className={styles.skillGroup} key={group.label}>
              <h4>{group.label}</h4>
              <ul aria-label={group.label}>
                {group.items.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.personal}>
          <h3>Outside of work!</h3>
          <div className={styles.personalNote}>
            <div>
              <p>Outside development, I spend a lot of time playing games and following esports.</p>
              <p className={styles.recentNote}>I&apos;ve also been watching more films this year, including Primetime, Spider-Man, and Resident Evil (2026). I follow VCT each year and have attended Masters in London and Toronto.</p>
              <h4 className={styles.favouritesLabel}>Some favourites</h4>
              <ul className={styles.favouriteGames} aria-label="Favourite games">
                {["Animal Crossing", "Valorant", "Slay the Spire", "Clair Obscur: Expedition 33", "Paper Mario", "Resident Evil series"].map((game) => <li key={game}>{game}</li>)}
              </ul>
              <p className={styles.moreGames}>and plenty more.</p>
            </div>
            <div className={styles.competitive}>
              <h4>A competitive streak</h4>
              <ul className={styles.achievements}>
                <li><strong>Valorant</strong><span>Top 1,000 EU</span></li>
                <li><strong>Teamfight Tactics</strong><span>Master</span></li>
                <li><strong>Deadlock</strong><span>Eternus</span></li>
                <li><strong>CS:GO</strong><span>Global Elite</span></li>
              </ul>
              <p>As KCL&apos;s in-game leader, I helped the team win NSE Winter 2021 in UK collegiate Valorant.</p>
              <AnimatedDetails label="More competitive highlights" className={styles.gamingDetails}>
                <ul>
                  <li>Won two RDV league seasons as in-game leader.</li>
                  <li>Won Premier Elite 5 twice as in-game leader.</li>
                  <li>Coached the Valorant team TFT SilvX to a top 12 finish in GC3 NA 2023.</li>
                  <li>Achieved Grandmaster Complete in Voltaic Season 5.</li>
                </ul>
              </AnimatedDetails>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
