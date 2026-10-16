import { expect, test, type Page } from "@playwright/test";
import { blockStorage, collectPageErrors } from "./helpers";

function themeColors(page: Page): Promise<string[]> {
  return page
    .locator('meta[name="theme-color"]')
    .evaluateAll((metas) => metas.map((m) => m.getAttribute("content") ?? ""));
}

test("stored dark wins over light system", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(html).toHaveAttribute("data-theme", "dark");
  expect(await themeColors(page)).toEqual(["#050505", "#050505"]);
});

test("no stored value follows system", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);

  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/\bdark\b/);
  expect(await themeColors(page)).toEqual(["#ffffff", "#ffffff"]);
});

test("toggling theme updates every theme-color", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).filter({ visible: true }).click();
  expect(await themeColors(page)).toEqual(["#050505", "#050505"]);
});

test("invalid stored value falls back to system", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => localStorage.setItem("theme", "purple"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("throwing storage still renders", async ({ page }) => {
  const errors = collectPageErrors(page);
  await blockStorage(page);
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(html).toHaveClass(/\bjs\b/);
  expect(errors).toEqual([]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("theme-color follows the system scheme", async ({ page }) => {
    await page.goto("/");
    const metas = await page
      .locator('meta[name="theme-color"]')
      .evaluateAll((els) => els.map((m) => [m.getAttribute("media"), m.getAttribute("content")]));
    expect(metas).toEqual([
      ["(prefers-color-scheme: light)", "#ffffff"],
      ["(prefers-color-scheme: dark)", "#050505"],
    ]);
  });
});
