import { expect, test } from "@playwright/test";

const TITLES = [
  "Full-Time Lecturer",
  "Technical Specialist",
  "DevOps / Web Support",
  "Part-Time Lecturer",
  "Project-Based Web Developer",
  "Technical Customer Service",
  "Computer Technician",
  "Computer Technician",
];

test("four skill cards in spec order", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#skills h3")).toHaveText([
    "Teaching & Training",
    "Hardware & IT Support",
    "Deployment & Systems",
    "Software Development",
  ]);
});

test("marquee is hidden from assistive tech", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("[data-marquee]");
  await expect(rows).toHaveCount(2);
  for (const row of await rows.all()) await expect(row).toHaveAttribute("aria-hidden", "true");
});

test("no horizontal overflow at 360", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "phone viewport only");
  await page.goto("/");
  await page.locator("#skills").scrollIntoViewIfNeeded();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("timeline order and periods", async ({ page }) => {
  await page.goto("/");
  const items = page.locator("#experience ol > li");
  await expect(items.locator("h3")).toHaveText(TITLES);
  await expect(items.first()).toContainText("Jul 2026 – Present");
});

test("timeline fill reaches full at the end", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop only");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const scaleY = () =>
    page.locator("[data-timeline-fill]").evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).d);
  // At the top of the page the script has scaled the fill down; without it the fill would stay at 1.
  await expect.poll(scaleY).toBeLessThan(0.05);
  await page.locator("#experience ol > li").last().scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 1200);
  await expect.poll(scaleY).toBeGreaterThanOrEqual(0.99);
});
