/** Read from localStorage; returns null when storage is missing, blocked or throws. */
export function safeGet(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

/** Write to localStorage; silently does nothing when storage is missing, blocked or full. */
export function safeSet(key: string, value: string): void {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    // Storage unavailable: the setting lasts for this page view only.
  }
}
