import type { Period, Role, YearMonth } from "../data/types";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatYearMonth(ym: YearMonth): string {
  return ym.month ? `${MONTHS[ym.month - 1]} ${ym.year}` : String(ym.year);
}

export function formatPeriod(p: Period): string {
  const end = p.end === "present" ? "Present" : formatYearMonth(p.end);
  return `${formatYearMonth(p.start)} – ${end}`;
}

const validMonth = (ym: YearMonth) =>
  ym.month === undefined || (Number.isInteger(ym.month) && ym.month >= 1 && ym.month <= 12);

/** Months since year 0; a missing month counts as January for starts and December for ends. */
const monthKey = (ym: YearMonth, fallbackMonth: number) => ym.year * 12 + (ym.month ?? fallbackMonth) - 1;

export function isValidPeriod(p: Period): boolean {
  if (!validMonth(p.start)) return false;
  if (p.end === "present") return true;
  if (!validMonth(p.end)) return false;
  return monthKey(p.end, 12) >= monthKey(p.start, 1);
}

export function sortRolesByStartDesc(roles: Role[]): Role[] {
  return [...roles].sort((a, b) => {
    const byStart = monthKey(b.period.start, 1) - monthKey(a.period.start, 1);
    if (byStart !== 0) return byStart;
    const aOpen = a.period.end === "present" ? 0 : 1;
    const bOpen = b.period.end === "present" ? 0 : 1;
    if (aOpen !== bOpen) return aOpen - bOpen;
    return a.id.localeCompare(b.id);
  });
}
