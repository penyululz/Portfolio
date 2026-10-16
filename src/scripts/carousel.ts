import { wrapIndex } from "./carousel-index";

const SWIPE_MIN_PX = 60;

for (const root of document.querySelectorAll<HTMLElement>("[data-carousel]")) {
  const slides = [...root.querySelectorAll<HTMLElement>("[data-slide]")];
  const controls = document.querySelector<HTMLElement>(`[data-carousel-controls="${root.id}"]`);
  const counter = controls?.querySelector<HTMLElement>("[data-carousel-counter]");
  const chips = [...(controls?.querySelectorAll<HTMLButtonElement>("[data-carousel-chip]") ?? [])];
  const pad = (n: number) => String(n).padStart(2, "0");
  let active = 0;

  const show = (next: number, direction: 1 | -1) => {
    active = wrapIndex(next, slides.length);
    slides.forEach((slide, i) => {
      slide.toggleAttribute("data-active", i === active);
      if (i === active) slide.dataset.dir = String(direction);
    });
    chips.forEach((chip, i) => chip.setAttribute("aria-current", String(i === active)));
    if (counter) counter.textContent = `${pad(active + 1)} / ${pad(slides.length)}`;
  };

  controls?.querySelector("[data-carousel-prev]")?.addEventListener("click", () => show(active - 1, -1));
  controls?.querySelector("[data-carousel-next]")?.addEventListener("click", () => show(active + 1, 1));
  chips.forEach((chip, i) => chip.addEventListener("click", () => show(i, i >= active ? 1 : -1)));

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") show(active + 1, 1);
    else if (event.key === "ArrowLeft") show(active - 1, -1);
    else return;
    event.preventDefault();
  });

  let start: { x: number; y: number } | null = null;
  root.addEventListener("pointerdown", (event) => {
    start = { x: event.clientX, y: event.clientY };
  });
  root.addEventListener("pointercancel", () => {
    start = null;
  });
  root.addEventListener("pointerup", (event) => {
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) <= Math.abs(dy)) return;
    show(dx < 0 ? active + 1 : active - 1, dx < 0 ? 1 : -1);
  });

  if (controls) controls.hidden = false;
  root.classList.add("is-carousel");
  show(0, 1);
}
