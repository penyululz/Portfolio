import { SITE, THEME_KEY, type Theme } from "../site.config";
import { safeSet } from "../lib/storage";

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", SITE.themeColor[theme]);
  safeSet(THEME_KEY, theme);
  syncToggles(theme);
  window.dispatchEvent(new CustomEvent<{ theme: Theme }>("themechange", { detail: { theme } }));
}

function syncToggles(theme: Theme): void {
  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")) {
    button.setAttribute("aria-label", label);
  }
}

for (const button of document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")) {
  button.hidden = false;
  button.addEventListener("click", () => setTheme(currentTheme() === "dark" ? "light" : "dark"));
}
syncToggles(currentTheme());
