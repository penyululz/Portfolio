const toggle = document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]');
const menu = document.getElementById("mobile-menu");

if (toggle && menu) {
  const setOpen = (open: boolean, restoreFocus = false) => {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    toggle.querySelector("[data-icon-open]")?.classList.toggle("hidden", open);
    toggle.querySelector("[data-icon-close]")?.classList.toggle("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
    if (restoreFocus) toggle.focus();
  };

  toggle.hidden = false;
  toggle.addEventListener("click", () => setOpen(Boolean(menu.hidden)));
  menu.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setOpen(false, true);
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
