import { describe, expect, it } from "vitest";
import { formatCredentialDate, sortCredentialsByDateDesc } from "../../src/lib/credentials";
import { credentials } from "../../src/data/credentials";

const byId = (id: string) => {
  const c = credentials.find((x) => x.id === id);
  if (!c) throw new Error(`missing credential ${id}`);
  return c;
};

describe("credentials", () => {
  it("formats a single day", () => {
    expect(formatCredentialDate(byId("wayground-innovator"))).toBe("18 Aug 2026");
  });

  it("formats a same-month range", () => {
    expect(formatCredentialDate(byId("jpk-induction"))).toBe("11–12 Jul 2026");
  });

  it("returns null when undated", () => {
    expect(formatCredentialDate(byId("integrity"))).toBeNull();
  });

  it("sorts newest first, stable on ties, undated last", () => {
    const ids = sortCredentialsByDateDesc(credentials).map((c) => c.id);
    expect(ids.slice(0, 2)).toEqual(["wayground-innovator", "wayground-game-changer"]);
    expect(ids.at(-1)).toBe("integrity");
  });
});
