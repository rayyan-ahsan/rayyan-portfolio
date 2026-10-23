# Rayyan's Portfolio

A personal portfolio for experimenting with design and interaction. The current Animal Crossing inspired theme combines Photoshop-edited assets, clear navigation, responsive layouts, and playful motion.

## Features

- A draggable developer tag with spring motion and rotation.
- A project pinboard with draggable cards and expandable details.
- Screenshot galleries and video walkthroughs.
- Scroll reveals, smooth navigation, and hover effects.
- Responsive layouts and reduced motion support.

## Built with

Next.js 16, React 19, TypeScript, CSS, Tailwind CSS 4, and Motion.

## Running locally

Install dependencies with `npm ci`, then run `npm run dev` and open http://localhost:3000.

The original design uses local fonts that are **not included in this public repository**. Supply your appropriately licensed font files in `assets/fonts/` using the filenames referenced in `app/layout.tsx`, or change that font configuration to use fonts available to you. The original files are the L, M, B and UB weights of FOT-RodinBokutoh Pro, and the L, M, B and EB weights of FOT-Seurat Pro.

The fonts must also be available to the build environment when deploying from source. They remain present in the author's local checkout; ignoring them in Git does not remove them from disk.

## Checks

- `npm run build`: production build.
- `npx tsc --noEmit --incremental false`: TypeScript check.
- `npm run lint`: ESLint.

## Assets

Project screenshots and demos show the projects featured on the site. Phosphor and Lucide icon licence notices are included in `assets/`. Third-party artwork, logos, and fonts retain their respective ownership.
