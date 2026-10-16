import type { Page } from "@playwright/test";

/** Make every localStorage read and write throw, like Safari private mode or blocked site data. */
export async function blockStorage(page: Page): Promise<void> {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked", "SecurityError");
    };
  });
}

/** Collect uncaught page errors for later assertion. */
export function collectPageErrors(page: Page): Error[] {
  const errors: Error[] = [];
  page.on("pageerror", (err) => errors.push(err));
  return errors;
}
