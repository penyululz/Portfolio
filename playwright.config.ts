import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:4321";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  webServer: {
    command: "npm run build && npm run preview -- --port 4321",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 180_000,
  },
  use: { baseURL },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile",
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 740 }, hasTouch: true },
    },
  ],
});
