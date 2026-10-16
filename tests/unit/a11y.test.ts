import { describe, expect, it } from "vitest";
import { A11Y_DEFAULTS, clampScale, parseSettings } from "../../src/lib/a11y";

describe("clampScale", () => {
  it("caps at 1.3", () => expect(clampScale(1.45)).toBe(1.3));
  it("floors at 0.9", () => expect(clampScale(0.5)).toBe(0.9));
  it("rounds float noise to two decimals", () => expect(clampScale(1.1000000001)).toBe(1.1));
  it("treats NaN as the default scale", () => expect(clampScale(Number.NaN)).toBe(1));
});

describe("parseSettings", () => {
  it("returns defaults for null", () => expect(parseSettings(null)).toEqual(A11Y_DEFAULTS));
  it("returns defaults for invalid JSON", () => expect(parseSettings("not json")).toEqual(A11Y_DEFAULTS));
  it("clamps scale and only accepts strict booleans", () => {
    expect(parseSettings('{"textScale":5,"linksUnderline":"yes","readableFont":true}')).toEqual({
      textScale: 1.3,
      linksUnderline: false,
      readableFont: true,
      pauseMotion: false,
    });
  });
  it("returns defaults for JSON that is not an object", () => expect(parseSettings("42")).toEqual(A11Y_DEFAULTS));
});

describe("pauseMotion", () => {
  it("defaults to false", () => expect(parseSettings(null).pauseMotion).toBe(false));
  it("reads a strict true", () => expect(parseSettings('{"pauseMotion":true}').pauseMotion).toBe(true));
});
