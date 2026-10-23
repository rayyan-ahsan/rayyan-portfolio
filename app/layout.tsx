import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const acTitle = localFont({
  src: [
    { path: "../assets/fonts/FOT-RodinBokutoh Pro L.otf", weight: "300", style: "normal" },
    { path: "../assets/fonts/FOT-RodinBokutoh Pro M.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/FOT-RodinBokutoh Pro B.otf", weight: "700", style: "normal" },
    { path: "../assets/fonts/FOT-RodinBokutoh Pro UB.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-ac-title",
  display: "swap",
});

const acUi = localFont({
  src: [
    { path: "../assets/fonts/FOT-Seurat Pro L.otf", weight: "300", style: "normal" },
    { path: "../assets/fonts/FOT-Seurat Pro M.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/FOT-Seurat Pro B.otf", weight: "700", style: "normal" },
    { path: "../assets/fonts/FOT-Seurat Pro EB.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-ac-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rayyan's Portfolio",
  description: "Hi I'm Rayyan, a passionate full-stack developer!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${acTitle.variable} ${acUi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="reset-scroll-on-refresh" strategy="beforeInteractive">
          {`(() => {
            const navigation = performance.getEntriesByType("navigation")[0];
            if (navigation?.type !== "reload") return;
            history.scrollRestoration = "manual";
            if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
            const resetScroll = () => {
              const root = document.documentElement;
              const previous = root.style.scrollBehavior;
              root.style.scrollBehavior = "auto";
              window.scrollTo(0, 0);
              root.style.scrollBehavior = previous;
            };
            resetScroll();
            window.addEventListener("pageshow", resetScroll, { once: true });
          })();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
