import { describe, expect, it } from "vitest";
import { formatPeriod, formatYearMonth, isValidPeriod, sortRolesByStartDesc } from "../../src/lib/period";
import { roles } from "../../src/data/experience";

describe("period", () => {
  it("formats a month-precise open period", () => {
    expect(formatPeriod({ start: { year: 2026, month: 7 }, end: "present" })).toBe("Jul 2026 – Present");
  });

  it("formats a year-only period", () => {
    expect(formatPeriod({ start: { year: 2022 }, end: { year: 2023 } })).toBe("2022 – 2023");
  });

  it("formats a single year-month", () => {
    expect(formatYearMonth({ year: 2024, month: 1 })).toBe("Jan 2024");
  });

  it("rejects month 13", () => {
    expect(isValidPeriod({ start: { year: 2025, month: 13 }, end: "present" })).toBe(false);
  });

  it("rejects an end before the start", () => {
    expect(isValidPeriod({ start: { year: 2025, month: 6 }, end: { year: 2025, month: 5 } })).toBe(false);
  });

  it("treats a year-only end as December", () => {
    expect(isValidPeriod({ start: { year: 2025, month: 6 }, end: { year: 2025 } })).toBe(true);
  });

  it("sorts roles by start date, newest first", () => {
    expect(sortRolesByStartDesc(roles).map((r) => r.id)).toEqual([
      "ttc-ft", "microbumi", "satusky", "ttc-pt", "tiktok", "allit", "eden", "kakmira",
    ]);
  });

  it("does not mutate its input", () => {
    const before = roles.map((r) => r.id);
    sortRolesByStartDesc(roles);
    expect(roles.map((r) => r.id)).toEqual(before);
  });
});
