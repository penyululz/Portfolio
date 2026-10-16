const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  for (const el of targets) el.classList.add("is-visible");
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    // A margin rather than a ratio threshold: very tall blocks never reach a ratio but still enter the margin.
    { threshold: 0, rootMargin: "0px 0px -15% 0px" },
  );
  for (const el of targets) observer.observe(el);
}
