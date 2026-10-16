import { expect, test } from "@playwright/test";

for (const [slug, title] of [
  ["assetflow", "AssetFlow"],
  ["melodia", "Melodia"],
] as const) {
  test(`${slug} case study renders`, async ({ page }) => {
    await page.goto(`/projects/${slug}`);
    await expect(page).toHaveTitle(`${title} case study | Mohamad Faris Danial`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    await expect(page.getByRole("heading", { name: "In short" })).toBeVisible();
  });
}

test("carousel slide opens its case study", async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects").getByRole("link", { name: "Read the AssetFlow case study" }).click();
  await expect(page).toHaveURL(/\/projects\/assetflow$/);
});

test("navbar on a case study page returns to home sections", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop nav");
  await page.goto("/projects/assetflow");
  await page.locator('header nav[aria-label="Primary"]').getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
});
