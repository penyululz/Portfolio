import { expect, test, type Page } from "@playwright/test";

const counter = (page: Page) => page.locator("[data-carousel-counter]");
const visibleTitle = (page: Page) => page.locator("[data-carousel] [data-slide] h3").filter({ visible: true });

test.beforeEach(async ({ page }) => {
  await page.goto("/#projects");
});

test("starts on AssetFlow", async ({ page }) => {
  await expect(counter(page)).toHaveText("01 / 05");
  await expect(visibleTitle(page)).toHaveText("AssetFlow");
  await expect(page.getByRole("link", { name: "Open AssetFlow" })).toHaveCount(0);
});

test("next and prev wrap", async ({ page }) => {
  await page.getByRole("button", { name: "Next project" }).click();
  await expect(counter(page)).toHaveText("02 / 05");
  await expect(visibleTitle(page)).toHaveText("Melodia");
  const open = page.getByRole("link", { name: "Open Melodia" });
  await expect(open).toHaveAttribute("href", "https://github.com/penyululz/Melodia");
  await expect(open).toHaveAttribute("target", "_blank");
  await expect(open).toHaveAttribute("rel", /noopener/);

  await page.getByRole("button", { name: "Previous project" }).click();
  await page.getByRole("button", { name: "Previous project" }).click();
  await expect(counter(page)).toHaveText("05 / 05");
  await expect(visibleTitle(page)).toHaveText("TikTok System");
});

test("chip jumps", async ({ page }) => {
  const chip = page.locator("[data-carousel-chip]", { hasText: "WebForge" });
  await chip.click();
  await expect(counter(page)).toHaveText("04 / 05");
  await expect(chip).toHaveAttribute("aria-current", "true");
});

test("arrow keys navigate", async ({ page }) => {
  await page.locator("[data-carousel]").focus();
  await page.keyboard.press("ArrowRight");
  await expect(counter(page)).toHaveText("02 / 05");
  await page.keyboard.press("ArrowLeft");
  await expect(counter(page)).toHaveText("01 / 05");
});

test("swipe navigates", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "touch viewport only");
  const slide = page.locator("[data-carousel] [data-slide]").filter({ visible: true });
  await slide.scrollIntoViewIfNeeded();
  const box = await slide.boundingBox();
  if (!box) throw new Error("slide has no box");
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width * 0.75, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.75 - 120, y, { steps: 8 });
  await page.mouse.up();
  await expect(counter(page)).toHaveText("02 / 05");
});

test("every project is labelled AI-assisted", async ({ page }) => {
  const projects = page.locator("#projects");
  await expect(projects).toContainText("Every project here is AI-assisted");
  const pills = projects.locator("[data-ai-assisted]");
  await expect(pills).toHaveCount(8);
  for (const pill of await pills.all()) await expect(pill).toHaveText("AI-assisted");
});

test("self-hosted grid", async ({ page }) => {
  await expect(page.locator("[data-self-hosted] li h4")).toHaveText(["Immich", "Stirling PDF", "Gomail"]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all featured projects are readable", async ({ page }) => {
    for (const title of ["AssetFlow", "Melodia", "Facility Management Partner", "WebForge", "TikTok System"]) {
      await expect(page.locator("[data-carousel] h3", { hasText: title })).toBeVisible();
    }
  });
});
