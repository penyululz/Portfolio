import { describe, expect, it } from "vitest";
import { heroVideoSrc, shouldPlayVideo } from "../../src/scripts/hero-video-policy";

describe("hero video policy", () => {
  it("plays on a wide screen with motion allowed and no Save-Data", () => {
    expect(shouldPlayVideo({ width: 1280, reducedMotion: false, saveData: false })).toBe(true);
  });

  it("stays off below 1024px", () => {
    expect(shouldPlayVideo({ width: 1023, reducedMotion: false, saveData: false })).toBe(false);
  });

  it("stays off under reduced motion", () => {
    expect(shouldPlayVideo({ width: 1920, reducedMotion: true, saveData: false })).toBe(false);
  });

  it("stays off with Save-Data", () => {
    expect(shouldPlayVideo({ width: 1920, reducedMotion: false, saveData: true })).toBe(false);
  });

  it("picks the theme's video file", () => {
    expect(heroVideoSrc("dark")).toBe("/video/hero-dark.mp4");
  });
});
