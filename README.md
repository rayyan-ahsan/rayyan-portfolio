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

The fonts must also be available to the build environment when deploying from source. They remain present in the author's local checkout; ignoring them in Git does not remove them from disk. `npm run build` checks for the expected fonts and downloads missing files from `FONT_BASE_URL` when configured. Each font is verified against its SHA-256 checksum before use.

## Checks

- `npm run build`: production build.
- `npx tsc --noEmit --incremental false`: TypeScript check.
- `npm run lint`: ESLint.

## Deploy to Cloudflare Pages (GitHub)

Connect `rayyan-ahsan/rayyan-portfolio` in Cloudflare Pages with these settings:

- Production branch: `master`.
- Build command: `npm run build`.
- Build output directory: `out`.
- Build environment variable `FONT_BASE_URL`: `https://rayyan-portfolio-fonts.pages.dev/fonts/` (set for production and preview builds).

The separate `rayyan-portfolio-fonts` Pages project hosts the font files. They stay excluded from Git; the build fetches them before Next.js compiles and includes them in the exported website. Keep that asset project available for future builds. To replace the fonts, update the hosted files and the checksums in `scripts/prepare-fonts.mjs` together.

After deployment, attach `rayyanahsan.com` under the portfolio project's **Custom domains**. Future pushes to `master` automatically rebuild and deploy the portfolio.

## Deploy to Cloudflare Pages (direct upload alternative)

This portfolio exports a static website, including its fonts, images and videos. It does not require a Node.js server at runtime.

1. Run `npm ci` in this local checkout, where the font files are present.
2. Run `npm run lint`, `npm run typecheck`, and `npm run build`.
3. In Cloudflare **Workers & Pages**, create a **Pages** project using **Direct Upload**.
4. Upload the contents of the generated `out/` folder (or a ZIP with `index.html` at its root).
5. Add your domain under that Pages project's **Custom domains** and follow Cloudflare's DNS instructions.

For later updates, rebuild locally and upload the new `out/` folder to the same project. Use `npm run dev` for development; `next start` is not used for static exports.

The production build uses Webpack. Images are served as static files, so no Next.js image-optimisation server or Cloudflare Worker is required. The generated `out/` folder and font source files are intentionally excluded from Git.

## Assets

Project screenshots and demos show the projects featured on the site. Phosphor and Lucide icon licence notices are included in `assets/`. Third-party artwork, logos, and fonts retain their respective ownership.
