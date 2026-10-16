import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const SECTION_IDS = ["home", "about", "teaching", "projects", "skills", "experience", "credentials", "contact"];

for (const colorScheme of ["light", "dark"] as const) {
  test(`no serious axe violations (${colorScheme})`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop only");
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    await page.goto("/");
    // The skills marquee is aria-hidden decoration (low-contrast watermark text), exempt under WCAG 1.4.3.
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .exclude("[data-marquee]")
      .analyze();
    const serious = results.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => ({ id: v.id, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) }));
    expect(serious).toEqual([]);
  });
}

test("no horizontal scroll at 360", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "phone viewport only");
  await page.goto("/");
  for (const id of SECTION_IDS) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `#${id}`).toBeLessThanOrEqual(0);
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every section is readable", async ({ page }) => {
    await page.goto("/");
    for (const id of SECTION_IDS) {
      const heading = page.locator(`#${id}`).locator(id === "home" ? "h1" : "h2").first();
      await expect(heading, `#${id}`).toBeVisible();
      expect(await heading.evaluate((el) => getComputedStyle(el).opacity), `#${id}`).toBe("1");
    }
  });
});

test("structured data", async ({ page }) => {
  await page.goto("/");
  const json = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(json ?? "{}");
  expect(data["@type"]).toBe("Person");
  expect(data.jobTitle).toBe("Lecturer & Technical Builder");
  expect(data.sameAs).toContain("https://github.com/penyululz");
});

test("social meta is absolute", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:\/\/farisdanial\.space\//);
  await expect(page).toHaveTitle("Mohamad Faris Danial | Lecturer & Technical Builder");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://farisdanial.space/");
});

test("sitemap and robots served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("sitemap-index.xml");
  const sitemap = await request.get("/sitemap-index.xml");
  expect(sitemap.status()).toBe(200);
});
