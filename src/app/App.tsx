import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AccessibilityTools } from "./components/AccessibilityTools";
import { siteConfig } from "./site";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.title = siteConfig.title;
    window.localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", siteConfig.themeColor[theme]);
    }
  }, [theme]);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="relative min-h-screen overflow-x-hidden bg-background font-sans text-zinc-950 selection:bg-emerald-500/20 transition-colors duration-300 dark:bg-[#050505] dark:text-zinc-50 dark:selection:bg-emerald-500/30">
        <Navbar theme={theme} onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))} />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-72 dark:opacity-60"
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(180deg, rgba(5,5,5,0.58), rgba(5,5,5,0.68)), radial-gradient(circle at 18% 16%, rgba(16,185,129,0.12), transparent 26%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.05), transparent 20%)"
                : "linear-gradient(180deg, rgba(255,255,255,0.54), rgba(255,255,255,0.62)), radial-gradient(circle at 18% 16%, rgba(5,150,105,0.07), transparent 24%), radial-gradient(circle at 82% 18%, rgba(24,24,27,0.03), transparent 18%)",
          }}
        />

        <main className="relative z-10">
          <Hero theme={theme} />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </main>
        <AccessibilityTools />
      </div>
    </div>
  );
}
