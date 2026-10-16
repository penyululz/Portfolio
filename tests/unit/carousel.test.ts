import { describe, expect, it } from "vitest";
import { wrapIndex } from "../../src/scripts/carousel-index";

describe("wrapIndex", () => {
  it("wraps -1 to the last slide", () => expect(wrapIndex(-1, 5)).toBe(4));
  it("wraps length to the first slide", () => expect(wrapIndex(5, 5)).toBe(0));
  it("wraps large indexes", () => expect(wrapIndex(12, 5)).toBe(2));
  it("keeps in-range indexes", () => expect(wrapIndex(0, 5)).toBe(0));
});
