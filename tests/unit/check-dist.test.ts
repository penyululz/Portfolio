import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
// @ts-expect-error -- plain ESM script without type declarations
import { checkDist } from "../../scripts/check-dist.mjs";

const MiB = 1024 * 1024;
const dirs: string[] = [];

function fixture(files: Record<string, string | number>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "dist-"));
  dirs.push(dir);
  for (const [rel, content] of Object.entries(files)) {
    const file = path.join(dir, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, typeof content === "number" ? Buffer.alloc(content) : content);
  }
  return dir;
}

afterEach(() => {
  for (const dir of dirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

describe("checkDist", () => {
  it("clean dist has no problems", () => {
    const dir = fixture({ "index.html": "<p>+60 13 5858 199</p>", "resume.pdf": "%PDF" });
    expect(checkDist(dir)).toEqual([]);
  });

  it("dashed IC in html is flagged", () => {
    const dir = fixture({ "index.html": "<p>IC 990101-01-1234</p>" });
    expect(checkDist(dir)).toEqual([{ file: "index.html", rule: "nric" }]);
  });

  it("undashed IC in js is flagged", () => {
    const dir = fixture({ "_astro/a.js": 'const x="990101011234";' });
    expect(checkDist(dir)).toEqual([{ file: "_astro/a.js", rule: "nric" }]);
  });

  it("certificate pdf is flagged", () => {
    const dir = fixture({ "resume.pdf": "%PDF", "certs/dkm.pdf": "%PDF" });
    expect(checkDist(dir)).toEqual([{ file: "certs/dkm.pdf", rule: "pdf" }]);
  });

  it("oversize file is flagged", () => {
    const dir = fixture({ "video/x.mp4": 7 * MiB });
    const problems = checkDist(dir);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toMatchObject({ file: "video/x.mp4", rule: "file-size" });
  });

  it("total over budget is flagged", () => {
    const size = Math.round(5.5 * MiB);
    const dir = fixture({ "a.bin": size, "b.bin": size, "c.bin": size });
    expect(checkDist(dir)).toEqual([{ file: "(total)", rule: "total-size" }]);
  });
});
