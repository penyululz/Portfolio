import { expect, test } from "@playwright/test";

const NAV_LABELS = ["About", "Teaching", "Projects", "Skills", "Experience", "Credentials", "Contact"];

test("desktop nav lists sections in order", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop nav only");
  await page.goto("/");
  await expect(page.locator('header nav[aria-label="Primary"] a')).toHaveText(NAV_LABELS);
});

test("nav link scrolls to section", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: "Projects" }).click();
  } else {
    await page.locator('header nav[aria-label="Primary"]').getByRole("link", { name: "Projects" }).click();
  }
  await expect(page.locator("#projects")).toBeInViewport();
});

test("resume link downloads the 2026 resume", async ({ page, request }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
  }
  const link = page.locator("header").getByRole("link", { name: "Download Resume" }).filter({ visible: true });
  await expect(link).toHaveAttribute("href", "/resume.pdf");
  await expect(link).toHaveAttribute("download", "Mohamad-Faris-Danial-Resume-2026.pdf");
  const res = await request.get("/resume.pdf");
  expect(res.status()).toBe(200);
});

test("theme toggle switches and persists", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
});

test("mobile menu opens, closes on Escape and restores focus", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile menu only");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Open navigation menu" });
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  const menuButton = page.locator('[aria-controls="mobile-menu"]');
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test("mobile menu closes after choosing a link", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile menu only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: "Skills" }).click();
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(page.locator('[aria-controls="mobile-menu"]')).toHaveAttribute("aria-expanded", "false");
});
