import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { checkDist } from "../../scripts/check-dist.mjs";

const MiB = 1024 * 1024;
const dirs: string[] = [];

/** Build a minimal one-page PDF that shows `text` in Helvetica, with a valid xref table. */
function pdf(text: string): Buffer {
  const content = `BT /F1 12 Tf 72 720 Td (${text}) Tj ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];
  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) out += `${String(offset).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out, "latin1");
}

function fixture(files: Record<string, string | number | Buffer>): string {
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
  it("clean dist has no problems", async () => {
    const dir = fixture({ "index.html": "<p>+60 13 5858 199</p>", "resume.pdf": pdf("Mohamad Faris Danial") });
    expect(await checkDist(dir)).toEqual([]);
  });

  it("dashed IC in html is flagged", async () => {
    const dir = fixture({ "index.html": "<p>IC 990101-01-1234</p>" });
    expect(await checkDist(dir)).toEqual([{ file: "index.html", rule: "nric" }]);
  });

  it("undashed IC in js is flagged", async () => {
    const dir = fixture({ "_astro/a.js": 'const x="990101011234";' });
    expect(await checkDist(dir)).toEqual([{ file: "_astro/a.js", rule: "nric" }]);
  });

  it("certificate pdf is flagged", async () => {
    const dir = fixture({ "resume.pdf": pdf("Resume"), "certs/dkm.pdf": pdf("Certificate") });
    expect(await checkDist(dir)).toEqual([{ file: "certs/dkm.pdf", rule: "pdf" }]);
  });

  it("dashed IC in pdf text is flagged", async () => {
    const dir = fixture({ "resume.pdf": pdf("IC 990101-01-1234") });
    expect(await checkDist(dir)).toEqual([{ file: "resume.pdf", rule: "nric" }]);
  });

  it("undashed IC in pdf text is flagged", async () => {
    const dir = fixture({ "resume.pdf": pdf("990101011234") });
    expect(await checkDist(dir)).toEqual([{ file: "resume.pdf", rule: "nric" }]);
  });

  it("unreadable pdf is flagged", async () => {
    const dir = fixture({ "resume.pdf": "%PDF-1.4 not really a pdf" });
    expect(await checkDist(dir)).toEqual([{ file: "resume.pdf", rule: "pdf-unreadable" }]);
  });

  it("oversize file is flagged", async () => {
    const dir = fixture({ "video/x.mp4": 7 * MiB });
    const problems = await checkDist(dir);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toMatchObject({ file: "video/x.mp4", rule: "file-size" });
  });

  it("total over budget is flagged", async () => {
    const size = Math.round(5.5 * MiB);
    const dir = fixture({ "a.bin": size, "b.bin": size, "c.bin": size });
    expect(await checkDist(dir)).toEqual([{ file: "(total)", rule: "total-size" }]);
  });
});
