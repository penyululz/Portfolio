/** Modulo into [0, length) that also wraps negative indexes. */
export function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}
