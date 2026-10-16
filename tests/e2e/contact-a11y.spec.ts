import { expect, test, type Page } from "@playwright/test";
import { blockStorage, collectPageErrors } from "./helpers";

const fontSize = (page: Page) => page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
const openWidget = (page: Page) => page.getByRole("button", { name: "Open accessibility tools" }).click();

test("contact links", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact.locator('a[href="mailto:farismalekofficial@gmail.com"]').first()).toBeVisible();
  await expect(contact.locator('a[href="tel:+60135858199"]')).toHaveCount(1);
  const linkedin = contact.locator('a[href="https://www.linkedin.com/in/mohamad-faris-danial-abdul-malek-497246294"]');
  await expect(linkedin).toHaveAttribute("target", "_blank");
  const github = contact.locator('a[href="https://github.com/penyululz"]');
  await expect(github).toHaveAttribute("target", "_blank");
});

test("text scale clamps at 130% and persists", async ({ page }) => {
  await page.goto("/");
  await openWidget(page);
  const increase = page.getByRole("button", { name: "Increase text" });
  for (let i = 0; i < 5; i++) if (await increase.isEnabled()) await increase.click();
  await expect(page.locator("[data-a11y-scale]")).toHaveText("130%");
  await expect(increase).toBeDisabled();
  expect(await fontSize(page)).toBe("20.8px");
  await page.reload();
  expect(await fontSize(page)).toBe("20.8px");
});

test("reset restores defaults", async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("seeded")) {
      localStorage.setItem("portfolio-accessibility-settings", JSON.stringify({ textScale: 1.3, linksUnderline: true, readableFont: false }));
      sessionStorage.setItem("seeded", "1");
    }
  });
  await page.goto("/");
  await openWidget(page);
  const reset = page.getByRole("button", { name: "Reset settings" });
  await expect(reset).toBeEnabled();
  await reset.click();
  await expect(page.locator("[data-a11y-scale]")).toHaveText("100%");
  await expect(reset).toBeDisabled();
  expect(await fontSize(page)).toBe("16px");
});

test("toggles set aria-pressed and html classes", async ({ page }) => {
  await page.goto("/");
  await openWidget(page);
  const underline = page.getByRole("button", { name: /Underline links/ });
  await expect(underline).toHaveAttribute("aria-pressed", "false");
  await underline.click();
  await expect(underline).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveClass(/\ba11y-links-underline\b/);
  await page.getByRole("button", { name: /Readable font/ }).click();
  await expect(page.locator("html")).toHaveClass(/\ba11y-readable-font\b/);
});

test("escape closes and restores focus", async ({ page }) => {
  await page.goto("/");
  await openWidget(page);
  await expect(page.locator("#a11y-panel")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#a11y-panel")).toBeHidden();
  await expect(page.getByRole("button", { name: "Open accessibility tools" })).toBeFocused();
});

test("widget works when storage throws", async ({ page }) => {
  const errors = collectPageErrors(page);
  await blockStorage(page);
  await page.goto("/");
  await openWidget(page);
  await page.getByRole("button", { name: "Increase text" }).click();
  await expect(page.locator("[data-a11y-scale]")).toHaveText("110%");
  expect(await fontSize(page)).toBe("17.6px");
  expect(errors).toEqual([]);
});

test("tab moves from the open toggle into the panel", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open accessibility tools" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Increase text" })).toBeFocused();
});

test("focus stays in the panel when increase reaches its limit", async ({ page }) => {
  await page.goto("/");
  await openWidget(page);
  await page.getByRole("button", { name: "Increase text" }).focus();
  for (let i = 0; i < 3; i++) await page.keyboard.press("Enter");
  await expect(page.locator("[data-a11y-scale]")).toHaveText("130%");
  await expect(page.getByRole("button", { name: "Decrease text" })).toBeFocused();
});

test("pause animations stops the marquee and the hero video", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "video plays on desktop only");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("[data-hero-video]")).toHaveAttribute("src", /hero-/);
  await openWidget(page);
  const pause = page.getByRole("button", { name: /Pause animations/ });
  await pause.click();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveClass(/\ba11y-no-motion\b/);
  const animation = await page.locator(".marquee-track").first().evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe("none");
  await expect.poll(() => page.locator("[data-hero-video]").evaluate((v) => (v as HTMLVideoElement).paused)).toBe(true);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/\ba11y-no-motion\b/);
  await expect(page.locator("[data-hero-video]")).not.toHaveAttribute("src", /.+/);
});

test("respects the browser's default font size", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "one project is enough");
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Page.enable");
  await cdp.send("Page.setFontSizes", { fontSizes: { standard: 20 } });
  await page.goto("/");
  expect(await fontSize(page)).toBe("20px");
});
