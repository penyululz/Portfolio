export type A11ySettings = { textScale: number; linksUnderline: boolean; readableFont: boolean };

export const A11Y_KEY = "portfolio-accessibility-settings";
export const A11Y_DEFAULTS: A11ySettings = { textScale: 1, linksUnderline: false, readableFont: false };
export const MIN_SCALE = 0.9;
export const MAX_SCALE = 1.3;
export const SCALE_STEP = 0.1;

export function clampScale(n: number): number {
  if (!Number.isFinite(n)) return A11Y_DEFAULTS.textScale;
  return Math.round(Math.min(MAX_SCALE, Math.max(MIN_SCALE, n)) * 100) / 100;
}

export function parseSettings(raw: string | null): A11ySettings {
  if (raw === null) return { ...A11Y_DEFAULTS };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ...A11Y_DEFAULTS };
  }
  if (typeof parsed !== "object" || parsed === null) return { ...A11Y_DEFAULTS };
  const value = parsed as Record<string, unknown>;
  return {
    textScale: typeof value.textScale === "number" ? clampScale(value.textScale) : A11Y_DEFAULTS.textScale,
    linksUnderline: value.linksUnderline === true,
    readableFont: value.readableFont === true,
  };
}
