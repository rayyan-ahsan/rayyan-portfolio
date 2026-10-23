"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import sayHeyButton from "@/assets/say-hey-button.png";
import notelyLogo from "@/assets/notely-logo.png";
import guandanThumbnail from "@/assets/guandan-thumbnail.png";
import valorantThumbnail from "@/assets/valorant-thumbnail.png";
import booksSlidesThumbnail from "@/assets/books-slides-thumbnail.png";
import housePricesThumbnail from "@/assets/house-prices-thumbnail.png";
import portfolioThumbnail from "@/assets/portfolio-thumbnail.png";
import styles from "./projects.module.css";
import ScrollLink from "./scroll-link";
import AnimatedDetails from "./animated-details";
import PinnedProjectCard from "./pinned-project-card";
import ScreenshotGallery, { type Screenshot } from "./screenshot-gallery";

type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  highlight: string;
  stack: string[];
  details: string[];
  links: { label: string; href: string }[];
  demo?: { src: string; label: string; width: number; height: number };
  screenshots?: Screenshot[];
  overview?: { label: string; items: string[] };
  private?: boolean;
};

const projects: Project[] = [
  {
    id: "valorant",
    name: "Valorant Queue",
    category: "Real-time web app",
    description:
      "A better way to organise custom games with friends. Queue up, draft two teams, and choose your maps before jumping into a match.",
    highlight: "From a 10 player queue to a match ready lobby",
    demo: {
      src: "/videos/valorant-tracker-captain-demo.mp4",
      label: "Captain's-view demo",
      width: 1280,
      height: 900,
    },
    stack: ["Go", "React", "PostgreSQL", "Docker"],
    details: [
      "Built a concurrent backend in Go to manage real-time lobbies and keep game-session state consistent across simultaneous users.",
      "Implemented a captain-led team draft, series-length voting, and map veto flow for custom matches.",
      "Used PostgreSQL for persistence and Docker with Google Cloud Run for deployment.",
    ],
    links: [
      {
        label: "View code",
        href: "https://github.com/rayyan-ahsan/valorant-custom-game-tracker",
      },
    ],
  },
  {
    id: "notely",
    name: "Notely",
    category: "Collaborative web app",
    screenshots: [{
      src: "/images/projects/notely-editor-clean.png",
      alt: "Notely's split-view Markdown editor showing source text beside rendered tables, maths, a code block, and a flowchart.",
      caption: "Implemented Markdown editor and preview",
      note: "Tables, maths, code and diagrams.",
      width: 1900,
      height: 970,
    }, {
      src: "/images/projects/notely-early-concept.png",
      alt: "Early Notely Adobe XD concept with a folder sidebar and a sample document containing text, code, and illustrations.",
      caption: "Early Adobe XD concept",
      note: "Design draft, not the implemented interface.",
      width: 1400,
      height: 800,
    }],
    description:
      "A shared home for notes. Create, organise, and share content through a custom Markdown editor and a Django-powered backend.",
    highlight: "Full-stack development & led a team of eight developers",
    stack: ["React", "TypeScript", "Python", "Django", "SQLite"],
    details: [
      "Led a team of eight developers, coordinating tasks and keeping delivery aligned with project goals.",
      "Designed REST APIs in Django to connect the frontend and backend.",
      "Implemented session management and input validation to protect user data within the team's collaborative note-taking platform.",
    ],
    private: true,
    links: [],
  },
  {
    id: "guandan",
    name: "Guandan",
    category: "Published game mod",
    screenshots: [{
      src: "/images/projects/guandan-table.jpg",
      alt: "Guandan in Tabletop Simulator, showing the card decks, player positions, and scripted Deal and Sort Hand buttons on a red table.",
      caption: "Guandan in Tabletop Simulator",
      note: "Custom card assets with dealing and hand sorting controls.",
      width: 1920,
      height: 1080,
    }],
    description:
      "The card table, with less busywork. A Guandan mod for Tabletop Simulator with custom assets and Lua tools for dealing cards and sorting hands.",
    highlight: "99 Workshop subscribers · 12 favourites",
    stack: ["Lua", "Tabletop Simulator", "Custom assets"],
    details: [
      "Created custom assets and Lua scripts to bring the card game to Tabletop Simulator.",
      "Automated card dealing and hand sorting to make setup and play more convenient.",
      "Published on Steam Workshop and inspired a community-created adaptation whose creator explicitly credited the original project.",
    ],
    links: [
      {
        label: "Steam Workshop",
        href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3138177412",
      },
      {
        label: "Community adaptation",
        href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3812889038",
      },
    ],
  },
  {
    id: "books",
    name: "Books and Slides",
    category: "Content creation tool",
    overview: {
      label: "How it works",
      items: [
        "Write and structure content in the custom Markdown editor.",
        "Choose a slideshow or book layout for the same content.",
        "Present it as slides or explore it as an interactive book website.",
      ],
    },
    description:
      "One piece of writing, two ways to explore it. Turn Markdown into interactive slideshows and book-style websites with a custom editor.",
    highlight: "From custom editor to interactive reading experience",
    stack: ["Next.js", "React", "TypeScript", "Node.js"],
    details: [
      "Built a full-stack application that turns Markdown into slideshow and book-style presentations.",
      "Wrote a custom document editor from scratch for creating and structuring content.",
      "Handled dynamic rendering, layout transitions, and frontend navigation between views.",
    ],
    private: true,
    links: [],
  },
  {
    id: "housing",
    name: "House Price Explorer",
    category: "Interactive data visualisation",
    description:
      "Explore England's house prices through an interactive map and quarterly charts, built with D3.js and Office for National Statistics data.",
    highlight: "Nine English regions · 1993 to 2023",
    stack: ["JavaScript", "D3.js", "HTML", "CSS"],
    screenshots: [{
      src: "/images/projects/house-prices-map.png",
      alt: "A blue choropleth map of England's nine regions, with a year slider, colour range selector, and house price legend.",
      caption: "Regional house price map",
      note: "Year selection and regional price comparisons.",
      width: 1171,
      height: 675,
    }, {
      src: "/images/projects/house-prices-chart.png",
      alt: "A line chart showing London's quarterly house prices in 2017, from Q1 to Q4.",
      caption: "Quarterly detail for a selected region",
      note: "Clicking a region opens its quarterly price chart.",
      width: 835,
      height: 632,
    }],
    details: [
      "Mapped regional price data to TopoJSON boundaries to create a choropleth map with D3.js.",
      "Added a year slider, regional tooltips, and colour scale modes for exploring changes over time.",
      "Built a region drill-down view with animated quarterly charts and hover details.",
    ],
    private: true,
    links: [],
  },
  {
    id: "portfolio",
    name: "This Portfolio",
    category: "Design & front-end experimentation",
    overview: {
      label: "Design choices",
      items: [
        "Use a familiar pinboard layout to make projects easy to browse, with more detail available on demand.",
        "Combine Photoshop asset editing, a soft colour palette, and playful typography to give the site its own personality.",
        "Add small moments of interaction through draggable cards, spring motion, and subtle hover effects.",
      ],
    },
    description:
      "My playground for clean UI and personal design flavour, with visuals edited in Photoshop and an Animal Crossing inspired design (for now).",
    highlight: "Design experiments & Photoshop asset editing",
    stack: ["Next.js", "React", "TypeScript", "CSS", "Motion", "Photoshop"],
    details: [
      "Edited and composed most of the site's visual assets in Photoshop to create a consistent visual identity.",
      "Balanced expressive artwork and playful interactions with readable content, clear navigation, and consistent controls.",
      "Built spring animations, draggable elements, scroll reveals, and screenshot galleries, with responsive layouts and reduced motion support.",
    ],
    links: [{ label: "View code", href: "https://github.com/rayyan-ahsan/rayyan-portfolio" }],
  },
];

function ProjectSketch({ kind }: { kind: string }) {
  if (kind === "portfolio") {
    return (
      <Image
        src={portfolioThumbnail}
        alt="This portfolio title between browser and paintbrush icons"
        className={`${styles.sketch} ${styles.projectThumbnail}`}
        sizes="(max-width: 720px) 80vw, 460px"
      />
    );
  }
  if (kind === "housing") {
    return (
      <Image
        src={housePricesThumbnail}
        alt="House price explorer title between a map and a rising chart"
        className={`${styles.sketch} ${styles.projectThumbnail}`}
        sizes="(max-width: 720px) 80vw, 460px"
      />
    );
  }
  // Decorative project illustrations, rather than screenshots of the applications.
  if (kind === "valorant") {
    return (
      <Image
        src={valorantThumbnail}
        alt="Valorant Queue title between two teams of five players, each with a crowned captain"
        className={`${styles.sketch} ${styles.projectThumbnail}`}
        sizes="(max-width: 720px) 80vw, 460px"
      />
    );
  }
  if (kind === "notely") {
    return (
      <Image
        src={notelyLogo}
        alt="Notely logo"
        className={`${styles.sketch} ${styles.projectLogo}`}
        sizes="(max-width: 720px) 80vw, 460px"
      />
    );
  }
  if (kind === "guandan") {
    return (
      <Image
        src={guandanThumbnail}
        alt="Guandan title between an illustrated card back and a red Bicycle card back"
        className={`${styles.sketch} ${styles.projectThumbnail}`}
        sizes="(max-width: 720px) 80vw, 460px"
      />
    );
  }
  return (
    <Image
      src={booksSlidesThumbnail}
      alt="Books and Slides title between an open book and a presentation chart"
      className={`${styles.sketch} ${styles.projectThumbnail}`}
      sizes="(max-width: 720px) 80vw, 460px"
    />
  );
}

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: reducedMotion ? false as const : { opacity: 0, y: 28, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { type: "spring" as const, stiffness: 180, damping: 22 },
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className={styles.section}>
      <motion.div
        className={styles.sectionSurface}
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.01 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg className={styles.sectionDivider} viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path d="M0 24Q180 0 360 24T720 24T1080 24T1440 24V64H0Z" fill="#e4d4b5" />
          <path d="M0 24Q180 0 360 24T720 24T1080 24T1440 24" fill="none" stroke="#d1bfa0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </motion.div>
      <div className={styles.inner}>
        <motion.header className={styles.header} {...reveal}>
          <span className={styles.eyebrow}>A few things from my workshop</span>
          <h2 id="projects-title">Things I&apos;ve built</h2>
          <p>From real-time lobbies to a friendlier card table. Here&apos;s what I&apos;ve been working on.</p>
        </motion.header>

        <motion.div
          className={styles.board}
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.02 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.boardLabel} aria-hidden="true">Ray&apos;s project board</div>
          <div className={styles.grid}>
            {Array.from({ length: Math.ceil(projects.length / 2) }, (_, rowIndex) => (
              <div className={styles.projectRow} key={rowIndex}>
              {projects.slice(rowIndex * 2, rowIndex * 2 + 2).map((project, columnIndex) => {
                const index = rowIndex * 2 + columnIndex;
                return (
              <motion.article
                key={project.id}
                className={styles.cardSlot}
                aria-labelledby={`${project.id}-title`}
                {...reveal}
                transition={{ ...reveal.transition, delay: reducedMotion ? 0 : (index % 2) * 0.1 }}
              >
                <PinnedProjectCard className={`${styles.card} ${styles[project.id]}`}>
                <div className={styles.pin} aria-hidden="true" />
                <div className={styles.illustration} data-card-handle>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <ProjectSketch kind={project.id} />
                  <span className={styles.category}>{project.category}</span>
                </div>
                <div className={styles.content}>
                  <h3 id={`${project.id}-title`}>{project.name}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <p className={styles.highlight}>{project.highlight}</p>
                  <ul className={styles.stack} aria-label={`${project.name} technologies`}>
                    {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  <div className={styles.projectControls}>
                  {project.demo && (
                    <AnimatedDetails
                      label="Watch demo"
                      className={`${styles.details} ${styles.demoDetails}`}
                    >
                      <figure className={styles.demoPreview}>
                        <div className={styles.demoFrame}>
                        <video
                          className={styles.demoVideo}
                          controls
                          playsInline
                          preload="metadata"
                          width={project.demo.width}
                          height={project.demo.height}
                          aria-label={`${project.name} demo`}
                          aria-describedby={`${project.id}-demo-caption`}
                        >
                          <source src={`${project.demo.src}#t=0.1`} type="video/mp4" />
                          <a href={project.demo.src}>Watch the {project.name} demo</a>
                        </video>
                        </div>
                        <figcaption id={`${project.id}-demo-caption`} className={styles.demoCaption}>
                          <div>
                            <span>{project.demo.label}</span>
                            <p>Valorant queue matchmaking walkthrough.</p>
                          </div>
                        </figcaption>
                        <div className={styles.demoToolbar}>
                          <button
                            type="button"
                            className={`${styles.expandDemo} animated-underline`}
                            onClick={(event) => {
                              const video = event.currentTarget.closest("figure")?.querySelector("video") as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
                              if (!video) return;
                              if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
                              else video.requestFullscreen?.().catch(() => video.focus());
                            }}
                          >
                            Expand video <span aria-hidden="true">⤢</span>
                          </button>
                        </div>
                      </figure>
                    </AnimatedDetails>
                  )}
                  {project.screenshots && (
                    <AnimatedDetails
                      label={project.screenshots.length === 1 ? "View screenshot" : "View screenshots"}
                      className={`${styles.details} ${styles.demoDetails}`}
                    >
                      <ScreenshotGallery screenshots={project.screenshots} />
                    </AnimatedDetails>
                  )}
                  {project.overview && (
                    <AnimatedDetails label={project.overview.label} className={`${styles.details} ${styles.demoDetails}`}>
                      <ul>{project.overview.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </AnimatedDetails>
                  )}
                  <AnimatedDetails label="Behind the build" className={styles.details}>
                    <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </AnimatedDetails>
                  <div className={styles.actions}>
                    {project.links.map((link) => (
                      <a className="animated-underline" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}<span aria-hidden="true"> ↗</span>
                        <span className={styles.srOnly}> (opens in a new tab)</span>
                      </a>
                    ))}
                    {project.private && <span className={styles.privateNote}>Source code private</span>}
                  </div>
                  </div>
                </div>
                </PinnedProjectCard>
              </motion.article>
                );
              })}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.footer className={styles.footer} {...reveal}>
          <div>
            <h2>Let&apos;s build something good.</h2>
            <p>Interested in my work? I&apos;d love to hear from you.</p>
          </div>
          <motion.a
            className={`${styles.contact} button-shine`}
            href="mailto:rayyan@rayyanahsan.com"
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Image src={sayHeyButton} alt="" className={styles.contactImage} />
            <span className={styles.contactText}>Say Hey to Ray!</span>
          </motion.a>
        </motion.footer>
        <motion.div {...reveal}>
          <ScrollLink className={`${styles.backToTop} animated-underline`} href="#top">Back to the top <span aria-hidden="true">↑</span></ScrollLink>
        </motion.div>
      </div>
    </section>
  );
}
