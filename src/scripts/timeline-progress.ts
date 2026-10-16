/**
 * Scroll progress of the experience timeline, matching the old site's `useScroll` offsets
 * ["start 75%", "end end"]: 0 when the top reaches 75% of the viewport, 1 when the bottom
 * reaches the bottom of the viewport.
 */
export function timelineProgress(top: number, height: number, viewportHeight: number): number {
  const span = height - 0.25 * viewportHeight;
  if (span <= 0) return top <= 0.75 * viewportHeight ? 1 : 0;
  return Math.min(1, Math.max(0, (0.75 * viewportHeight - top) / span));
}
