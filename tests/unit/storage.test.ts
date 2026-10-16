import { afterEach, describe, expect, it, vi } from "vitest";
import { safeGet, safeSet } from "../../src/lib/storage";

const throwing = {
  getItem: () => {
    throw new Error("SecurityError");
  },
  setItem: () => {
    throw new Error("QuotaExceededError");
  },
};

describe("storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("safeGet returns null when getItem throws", () => {
    vi.stubGlobal("localStorage", throwing);
    expect(safeGet("theme")).toBeNull();
  });

  it("safeSet does not throw when setItem throws", () => {
    vi.stubGlobal("localStorage", throwing);
    expect(() => safeSet("theme", "dark")).not.toThrow();
  });

  it("safeGet returns null when localStorage is undefined", () => {
    vi.stubGlobal("localStorage", undefined);
    expect(safeGet("theme")).toBeNull();
  });

  it("safeGet reads a stored value", () => {
    const store = new Map<string, string>([["theme", "dark"]]);
    vi.stubGlobal("localStorage", { getItem: (k: string) => store.get(k) ?? null, setItem: () => {} });
    expect(safeGet("theme")).toBe("dark");
  });
});
