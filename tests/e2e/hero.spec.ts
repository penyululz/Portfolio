import { expect, test } from "@playwright/test";

test("exactly one h1 reading FARIS DANIAL", async ({ page }) => {
  await page.goto("/");
  const h1 = page.locator("h1");
  await expect(h1).toHaveCount(1);
  expect((await h1.innerText()).replace(/\s+/g, " ").trim()).toBe("FARIS DANIAL");
});

test("eyebrow and tagline match profile", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero).toContainText("Lecturer | Technical Builder | IT Systems & Deployment");
  await expect(hero).toContainText("Lecturer at Tech Terrain College and technical builder.");
});

test("CTAs", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero.getByRole("link", { name: "View Projects" })).toHaveAttribute("href", "#projects");
  await expect(hero.getByRole("link", { name: "Download Resume" })).toHaveAttribute(
    "download",
    "Mohamad-Faris-Danial-Resume-2026.pdf",
  );
});

test("portrait has alt text", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#home").getByAltText("Portrait of Mohamad Faris Danial")).toBeVisible();
});

test("video stays off on phones", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "phone viewport only");
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("[data-hero-video]")).not.toHaveAttribute("src", /.+/);
});

test("video stays off under reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop viewport only");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("[data-hero-video]")).not.toHaveAttribute("src", /.+/);
});

test("video plays theme source on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop viewport only");
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator("[data-hero-video]");
  await expect(video).toHaveAttribute("src", /\/video\/hero-dark\.mp4$/);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(video).toHaveAttribute("src", /\/video\/hero-light\.mp4$/);
});

test("about shows MSU as ongoing", async ({ page }) => {
  await page.goto("/");
  const about = page.locator("#about");
  await expect(about).toContainText("Bachelor in Computer Science");
  await expect(about).toContainText("2025 – Present");
  await expect(about).toContainText("Core Philosophy");
});
