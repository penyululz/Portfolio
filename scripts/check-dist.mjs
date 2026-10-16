// Privacy and size gate for the built site. Usage: node scripts/check-dist.mjs <dir>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractText, getDocumentProxy } from "unpdf";

const MiB = 1024 * 1024;
const MAX_FILE = 6 * MiB;
const MAX_TOTAL = 15 * MiB;
const NRIC = /\b\d{6}-?\d{2}-?\d{4}\b/;
const TEXT_EXT = new Set([".html", ".js", ".mjs", ".css", ".json", ".xml", ".txt", ".svg", ".webmanifest"]);

/**
 * Extract the text of every page of a PDF, or null when it cannot be parsed.
 * @param {string} file
 * @returns {Promise<string | null>}
 */
async function pdfText(file) {
  try {
    const doc = await getDocumentProxy(new Uint8Array(fs.readFileSync(file)));
    const { text } = await extractText(doc, { mergePages: true });
    return text;
  } catch {
    return null;
  }
}

/**
 * @param {string} dir
 * @returns {Promise<{ file: string, rule: "nric" | "pdf" | "pdf-unreadable" | "file-size" | "total-size" }[]>}
 */
export async function checkDist(dir) {
  const problems = [];
  let total = 0;
  const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const abs = path.join(entry.parentPath, entry.name);
    const file = path.relative(dir, abs).split(path.sep).join("/");
    const ext = path.extname(entry.name).toLowerCase();
    const size = fs.statSync(abs).size;
    total += size;
    if (TEXT_EXT.has(ext) && NRIC.test(fs.readFileSync(abs, "utf8"))) problems.push({ file, rule: "nric" });
    if (ext === ".pdf" && file !== "resume.pdf") problems.push({ file, rule: "pdf" });
    if (file === "resume.pdf") {
      const text = await pdfText(abs);
      if (text === null) problems.push({ file, rule: "pdf-unreadable" });
      else if (NRIC.test(text)) problems.push({ file, rule: "nric" });
    }
    if (size > MAX_FILE) problems.push({ file, rule: "file-size" });
  }
  if (total > MAX_TOTAL) problems.push({ file: "(total)", rule: "total-size" });
  return problems;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = process.argv[2] ?? "dist";
  const problems = await checkDist(dir);
  if (problems.length > 0) {
    for (const p of problems) console.error(`${p.rule}: ${p.file}`);
    process.exit(1);
  }
  console.log("dist OK");
}
