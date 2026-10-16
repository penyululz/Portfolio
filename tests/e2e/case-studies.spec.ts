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
