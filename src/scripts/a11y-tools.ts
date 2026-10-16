import {
  A11Y_DEFAULTS,
  A11Y_KEY,
  MAX_SCALE,
  MIN_SCALE,
  SCALE_STEP,
  clampScale,
  parseSettings,
  type A11ySettings,
} from "../lib/a11y";
import { safeGet, safeSet } from "../lib/storage";

const toggle = document.querySelector<HTMLButtonElement>("[data-a11y-toggle]");
const panel = document.getElementById("a11y-panel");

if (toggle && panel) {
  const q = <T extends HTMLElement>(selector: string) => panel.querySelector<T>(selector);
  const scaleLabel = q<HTMLElement>("[data-a11y-scale]");
  const increase = q<HTMLButtonElement>("[data-a11y-increase]");
  const decrease = q<HTMLButtonElement>("[data-a11y-decrease]");
  const underline = q<HTMLButtonElement>("[data-a11y-underline]");
  const readable = q<HTMLButtonElement>("[data-a11y-readable]");
  const reset = q<HTMLButtonElement>("[data-a11y-reset]");

  let settings: A11ySettings = parseSettings(safeGet(A11Y_KEY));

  const isDefault = (s: A11ySettings) =>
    s.textScale === A11Y_DEFAULTS.textScale &&
    s.linksUnderline === A11Y_DEFAULTS.linksUnderline &&
    s.readableFont === A11Y_DEFAULTS.readableFont;

  const setPressed = (button: HTMLButtonElement | null, on: boolean) => {
    if (!button) return;
    button.setAttribute("aria-pressed", String(on));
    const state = button.querySelector("[data-state]");
    if (state) state.textContent = on ? "On" : "Off";
  };

  const apply = (next: A11ySettings, persist = true) => {
    settings = next;
    const root = document.documentElement;
    root.style.setProperty("--app-font-scale", String(next.textScale));
    root.classList.toggle("a11y-links-underline", next.linksUnderline);
    root.classList.toggle("a11y-readable-font", next.readableFont);
    if (scaleLabel) scaleLabel.textContent = `${Math.round(next.textScale * 100)}%`;
    if (increase) increase.disabled = next.textScale >= MAX_SCALE;
    if (decrease) decrease.disabled = next.textScale <= MIN_SCALE;
    if (reset) reset.disabled = isDefault(next);
    setPressed(underline, next.linksUnderline);
    setPressed(readable, next.readableFont);
    if (persist) safeSet(A11Y_KEY, JSON.stringify(next));
  };

  const setOpen = (open: boolean, restoreFocus = false) => {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close accessibility tools" : "Open accessibility tools");
    if (restoreFocus) toggle.focus();
  };

  increase?.addEventListener("click", () => apply({ ...settings, textScale: clampScale(settings.textScale + SCALE_STEP) }));
  decrease?.addEventListener("click", () => apply({ ...settings, textScale: clampScale(settings.textScale - SCALE_STEP) }));
  underline?.addEventListener("click", () => apply({ ...settings, linksUnderline: !settings.linksUnderline }));
  readable?.addEventListener("click", () => apply({ ...settings, readableFont: !settings.readableFont }));
  reset?.addEventListener("click", () => {
    apply({ ...A11Y_DEFAULTS });
    toggle.focus();
  });
  toggle.addEventListener("click", () => setOpen(Boolean(panel.hidden)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false, true);
  });

  toggle.hidden = false;
  apply(settings, false);
}
