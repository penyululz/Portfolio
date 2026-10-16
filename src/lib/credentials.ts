import type { Credential, DayDate } from "../data/types";
import { MONTHS } from "./period";


const formatDay = (d: DayDate) => `${d.day} ${MONTHS[d.month - 1]} ${d.year}`;

export function formatCredentialDate(c: Credential): string | null {
  if (!c.date) return null;
  const { date, dateEnd } = c;
  if (dateEnd && dateEnd.year === date.year && dateEnd.month === date.month && dateEnd.day !== date.day) {
    return `${date.day}–${dateEnd.day} ${MONTHS[date.month - 1]} ${date.year}`;
  }
  if (dateEnd && (dateEnd.year !== date.year || dateEnd.month !== date.month)) {
    return `${formatDay(date)} – ${formatDay(dateEnd)}`;
  }
  return formatDay(date);
}

const dayKey = (d: DayDate) => d.year * 10000 + d.month * 100 + d.day;

/** Newest first; ties keep source order; undated credentials go last. */
export function sortCredentialsByDateDesc(list: Credential[]): Credential[] {
  return [...list].sort((a, b) => {
    if (!a.date || !b.date) return (a.date ? 0 : 1) - (b.date ? 0 : 1);
    return dayKey(b.date) - dayKey(a.date);
  });
}
