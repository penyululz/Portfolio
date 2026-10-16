import { describe, expect, it } from "vitest";
import { timelineProgress } from "../../src/scripts/timeline-progress";

const VH = 800;
const H = 2000;

describe("timelineProgress", () => {
  it("is 0 before the timeline reaches 75% of the viewport", () => {
    expect(timelineProgress(700, H, VH)).toBe(0);
  });

  it("is 0 exactly at the start offset", () => {
    expect(timelineProgress(600, H, VH)).toBe(0);
  });

  it("is 1 when the bottom meets the viewport bottom", () => {
    expect(timelineProgress(-1200, H, VH)).toBe(1);
  });

  it("is 0.5 halfway", () => {
    expect(timelineProgress(-300, H, VH)).toBeCloseTo(0.5, 5);
  });

  it("is 1 for a timeline shorter than a quarter viewport once started", () => {
    expect(timelineProgress(500, 100, VH)).toBe(1);
  });
});
