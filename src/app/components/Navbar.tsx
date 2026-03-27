import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#project-fmp" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        <a
          href="#home"
          className="flex items-center rounded-full px-1 py-1 transition-transform hover:scale-[1.02]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img
            src={theme === "dark" ? "/brand/logo-dark-compact.svg" : "/brand/logo-light-compact.svg"}
            alt="Faris Danial logo"
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <div className="hidden items-center gap-3 lg:flex">
          <nav className="items-center gap-1 rounded-full border border-zinc-200 bg-white/96 p-2 shadow-[0_10px_30px_-22px_rgba(24,24,27,0.24)] dark:border-zinc-800 dark:bg-zinc-950/92 dark:shadow-none lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 xl:px-4"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/96 text-zinc-700 shadow-[0_10px_30px_-22px_rgba(24,24,27,0.24)] transition-colors hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950/92 dark:text-zinc-300 dark:shadow-none dark:hover:text-emerald-400"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/96 text-zinc-700 shadow-[0_10px_30px_-22px_rgba(24,24,27,0.24)] transition-colors hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950/92 dark:text-zinc-300 dark:shadow-none dark:hover:text-emerald-400"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/96 text-zinc-700 shadow-[0_10px_30px_-22px_rgba(24,24,27,0.24)] transition-colors hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950/92 dark:text-zinc-300 dark:shadow-none dark:hover:text-emerald-400"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="px-4 pt-3 lg:hidden">
          <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-zinc-200 bg-white/98 p-3 shadow-[0_16px_44px_-28px_rgba(24,24,27,0.28)] dark:border-zinc-800 dark:bg-zinc-950/96 dark:shadow-none">
            <nav className="grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
