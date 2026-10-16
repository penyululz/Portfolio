import { timelineProgress } from "./timeline-progress";

const track = document.querySelector<HTMLElement>("[data-timeline]");
const fill = document.querySelector<HTMLElement>("[data-timeline-fill]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (track && fill) {
  let queued = false;

  const update = () => {
    queued = false;
    if (reduceMotion.matches) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    const rect = track.getBoundingClientRect();
    fill.style.transform = `scaleY(${timelineProgress(rect.top, rect.height, window.innerHeight)})`;
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  reduceMotion.addEventListener("change", schedule);
  update();
}
