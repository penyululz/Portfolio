import { describe, expect, it } from "vitest";
import { profile } from "../../src/data/profile";
import { roles } from "../../src/data/experience";
import { projects } from "../../src/data/projects";
import { credentials, teachingCredentialIds } from "../../src/data/credentials";
import { education } from "../../src/data/education";
import { isValidPeriod } from "../../src/lib/period";

const NRIC = /\b\d{6}-?\d{2}-?\d{4}\b/;
const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe("content", () => {
  it("every role has a valid period", () => {
    for (const role of roles) expect(isValidPeriod(role.period), role.id).toBe(true);
  });

  it("ids are unique within each collection", () => {
    expect(unique(roles.map((r) => r.id))).toBe(true);
    expect(unique(projects.map((p) => p.id))).toBe(true);
    expect(unique(credentials.map((c) => c.id))).toBe(true);
    expect(unique(education.map((e) => e.id))).toBe(true);
  });

  it("every external link is https", () => {
    const hrefs = [...projects.flatMap((p) => (p.href ? [p.href] : [])), ...Object.values(profile.links)];
    for (const href of hrefs) expect(href.startsWith("https://"), href).toBe(true);
  });

  it("featured and self-hosted projects are in spec order", () => {
    expect(projects.filter((p) => p.group === "featured").map((p) => p.id)).toEqual([
      "assetflow", "melodia", "fmp", "webforge", "tiktok",
    ]);
    expect(projects.filter((p) => p.group === "self-hosted").map((p) => p.id)).toEqual([
      "immich", "stirling-pdf", "gomail",
    ]);
  });

  it("every image has alt text", () => {
    for (const p of projects) if (p.media.kind === "image") expect(p.media.alt.trim(), p.id).not.toBe("");
    for (const c of credentials) if (c.badge) expect(c.badge.alt.trim(), c.id).not.toBe("");
  });

  it("every project is marked AI-assisted", () => {
    for (const p of projects) expect(p.aiAssisted, p.id).toBe(true);
  });

  it("teaching chips reference existing credentials", () => {
    const ids = new Set(credentials.map((c) => c.id));
    for (const id of teachingCredentialIds) expect(ids.has(id), id).toBe(true);
  });

  it("resume downloads under the 2026 name", () => {
    expect(profile.resume.downloadName).toBe("Mohamad-Faris-Danial-Resume-2026.pdf");
  });

  it("contains no national IC number", () => {
    expect(JSON.stringify({ profile, roles, projects, credentials, education })).not.toMatch(NRIC);
  });

  it("keeps the web course credential id", () => {
    expect(credentials.find((c) => c.id === "web-html-css")?.credentialId).toBe("RS-6A5EE66167AA2");
  });
});
