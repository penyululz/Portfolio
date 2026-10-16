import type { Theme } from "../site.config";
import { heroVideoSrc, shouldPlayVideo } from "./hero-video-policy";

const video = document.querySelector<HTMLVideoElement>("[data-hero-video]");

const currentTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function load(theme: Theme): void {
  if (!video) return;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const allowed = shouldPlayVideo({
    width: window.innerWidth,
    reducedMotion:
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion"),
    saveData: connection?.saveData === true,
  });
  if (!allowed) {
    if (video.hasAttribute("src")) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    return;
  }
  const src = heroVideoSrc(theme);
  if (video.getAttribute("src") === src) return;
  video.src = src;
  video.play().catch(() => {
    // Autoplay refused: the page background behind the hero stays visible.
  });
}

if (video) {
  load(currentTheme());
  window.addEventListener("themechange", (event) => load((event as CustomEvent<{ theme: Theme }>).detail.theme));
  window.addEventListener("a11ychange", () => load(currentTheme()));
}
