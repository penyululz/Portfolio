import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("teaching lists both lecturer roles", async ({ page }) => {
  const teaching = page.locator("#teaching");
  const fullTime = teaching.locator("[data-teaching-role]", { hasText: "Full-Time Lecturer" });
  await expect(fullTime).toContainText("Jul 2026 – Present");
  const partTime = teaching.locator("[data-teaching-role]", { hasText: "Part-Time Lecturer" });
  await expect(partTime).toContainText("Jan 2024 – Dec 2025");
});

test("teaching chips in order", async ({ page }) => {
  await expect(page.locator("#teaching [data-credential] h3")).toHaveText([
    "Professional Development Innovator",
    "Certified Game Changer",
    "Kursus Induksi Personel Pentauliahan PP-PPD-PPB",
    "Digital Storytelling in the AI Era for Educators",
  ]);
});

test("badges have alt text", async ({ page }) => {
  await expect(page.locator('#credentials img[alt="Wayground Certified Game Changer badge"]')).toBeVisible();
});

test("all ten credentials, newest first, undated last", async ({ page }) => {
  const cards = page.locator("#credentials [data-credential]");
  await expect(cards).toHaveCount(10);
  await expect(cards.first().locator("h3")).toHaveText("Professional Development Innovator");
  const last = cards.last();
  await expect(last.locator("h3")).toHaveText("Cultivating Integrity in the Workplace");
  await expect(last.locator("time")).toHaveCount(0);
});

test("date range format", async ({ page }) => {
  const jpk = page.locator("#credentials [data-credential]", { hasText: "PP-PPD-PPB" });
  await expect(jpk).toContainText("11–12 Jul 2026");
});

test("credential id shown", async ({ page }) => {
  const web = page.locator("#credentials [data-credential]", { hasText: "HTML & CSS" });
  await expect(web).toContainText("RS-6A5EE66167AA2");
});

test("education lists four items, MSU current", async ({ page }) => {
  const items = page.locator("#credentials [data-education] li");
  await expect(items).toHaveCount(4);
  await expect(items.first()).toContainText("Management & Science University (MSU)");
});

test("no certificate files are linked", async ({ page }) => {
  const pdfLinks = await page.locator('a[href$=".pdf"]').evaluateAll((els) =>
    els.map((el) => el.getAttribute("href")),
  );
  expect(pdfLinks.every((href) => href === "/resume.pdf")).toBe(true);
});
