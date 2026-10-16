import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "../../src/data/projects";

describe("case studies", () => {
  it("every case study file matches a project id", () => {
    const ids = new Set(projects.map((p) => p.id));
    const slugs = fs.readdirSync("src/content/case-studies").map((f) => path.basename(f, ".md"));
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) expect(ids, slug).toContain(slug);
  });
});
