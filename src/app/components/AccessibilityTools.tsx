import { useEffect, useMemo, useState } from "react";
import {
  Accessibility,
  RotateCcw,
  Type,
  Underline,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { cn } from "./ui/utils";

type AccessibilitySettings = {
  textScale: number;
  linksUnderline: boolean;
  readableFont: boolean;
};

const ACCESSIBILITY_STORAGE_KEY = "portfolio-accessibility-settings";
const DEFAULT_SETTINGS: AccessibilitySettings = {
  textScale: 1,
  linksUnderline: false,
  readableFont: false,
};

const MIN_TEXT_SCALE = 0.9;
const MAX_TEXT_SCALE = 1.3;
const TEXT_SCALE_STEP = 0.1;

const clampTextScale = (value: number) =>
  Math.min(MAX_TEXT_SCALE, Math.max(MIN_TEXT_SCALE, Number(value.toFixed(2))));

const readStoredSettings = (): AccessibilitySettings => {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const stored = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!stored) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(stored) as Partial<AccessibilitySettings>;
    return {
      textScale: clampTextScale(
        typeof parsed.textScale === "number"
          ? parsed.textScale
          : DEFAULT_SETTINGS.textScale,
      ),
      linksUnderline: Boolean(parsed.linksUnderline),
      readableFont: Boolean(parsed.readableFont),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export function AccessibilityTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() =>
    readStoredSettings(),
  );

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--app-font-scale", String(settings.textScale));
    root.classList.toggle("a11y-links-underline", settings.linksUnderline);
    root.classList.toggle("a11y-readable-font", settings.readableFont);
    window.localStorage.setItem(
      ACCESSIBILITY_STORAGE_KEY,
      JSON.stringify(settings),
    );

    return () => {
      root.style.removeProperty("--app-font-scale");
      root.classList.remove("a11y-links-underline");
      root.classList.remove("a11y-readable-font");
    };
  }, [settings]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const media = window.matchMedia("(max-width: 640px)");
    const syncViewport = () => setIsMobile(media.matches);

    syncViewport();
    media.addEventListener("change", syncViewport);

    return () => media.removeEventListener("change", syncViewport);
  }, []);

  const hasCustomSettings = useMemo(
    () =>
      settings.textScale !== DEFAULT_SETTINGS.textScale ||
      settings.linksUnderline !== DEFAULT_SETTINGS.linksUnderline ||
      settings.readableFont !== DEFAULT_SETTINGS.readableFont,
    [settings],
  );

  const canIncreaseText = settings.textScale < MAX_TEXT_SCALE;
  const canDecreaseText = settings.textScale > MIN_TEXT_SCALE;

  const updateTextScale = (delta: number) => {
    setSettings((current) => ({
      ...current,
      textScale: clampTextScale(current.textScale + delta),
    }));
  };

  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  const actionButtonClassName =
    "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-zinc-800 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-45 dark:text-zinc-100 dark:hover:bg-zinc-800/70";

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div
          className={cn(
            "rounded-[1.6rem] border border-zinc-200 bg-white p-4 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.28)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.7)]",
            isMobile
              ? "fixed inset-x-4 bottom-20 max-h-[min(28rem,72vh)] overflow-y-auto"
              : "w-[18rem]",
          )}
        >
          <div className="border-b border-zinc-200 px-1 pb-3 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black tracking-tight text-zinc-950 dark:text-white">
                  Accessibility
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Text and readability tools
                </p>
              </div>
              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                {Math.round(settings.textScale * 100)}%
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <button
              type="button"
              onClick={() => updateTextScale(TEXT_SCALE_STEP)}
              disabled={!canIncreaseText}
              className={actionButtonClassName}
            >
              <ZoomIn size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="flex-1">Increase text</span>
            </button>

            <button
              type="button"
              onClick={() => updateTextScale(-TEXT_SCALE_STEP)}
              disabled={!canDecreaseText}
              className={actionButtonClassName}
            >
              <ZoomOut size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="flex-1">Decrease text</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setSettings((current) => ({
                  ...current,
                  linksUnderline: !current.linksUnderline,
                }))
              }
              className={actionButtonClassName}
            >
              <Underline size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="flex-1">Underline links</span>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {settings.linksUnderline ? "On" : "Off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setSettings((current) => ({
                  ...current,
                  readableFont: !current.readableFont,
                }))
              }
              className={actionButtonClassName}
            >
              <Type size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="flex-1">Readable font</span>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {settings.readableFont ? "On" : "Off"}
              </span>
            </button>
          </div>

          <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-800">
            <button
              type="button"
              onClick={resetSettings}
              disabled={!hasCustomSettings}
              className={actionButtonClassName}
            >
              <RotateCcw size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="flex-1">Reset settings</span>
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close accessibility tools" : "Open accessibility tools"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-emerald-500/25 bg-zinc-950 text-white shadow-[0_20px_48px_-18px_rgba(16,185,129,0.45)] transition-transform hover:scale-[1.04] dark:bg-white dark:text-black"
      >
        <Accessibility size={isMobile ? 20 : 24} />
      </button>
    </div>
  );
}
