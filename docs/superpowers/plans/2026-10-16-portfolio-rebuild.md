# Portfolio 2026 Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Astro portfolio that presents Mohamad Faris Danial as Lecturer & Technical Builder, using real resume, certificate and project data and the visual language of the old React portfolio.

**Architecture:** Single-page Astro site with static output. All content lives in typed data modules under `src/data/`, rendered by one Astro component per section. Pure helpers in `src/lib/` (unit-tested with Vitest) back small client scripts in `src/scripts/` for the theme, nav, carousel, timeline, hero video and accessibility widget. No UI framework runtime. Playwright with axe tests the built site.

**Tech Stack:** Astro (latest stable at install) · TypeScript strict · Tailwind CSS 4 (`@tailwindcss/vite`) · `@lucide/astro` · `bootstrap-icons` (GitHub/LinkedIn glyphs only) · Vitest · Playwright + `@axe-core/playwright` · `sharp`, `ffmpeg-static` (asset scripts) · `@astrojs/sitemap` · Vercel.

**Spec:** `docs/superpowers/specs/2026-10-16-portfolio-design.md`. Section numbers like §4.3 below refer to it. Its §4 is the only source of copy.

## Global Constraints

- Project root: `E:\Portfolio-master\portfolio-2026`. Run every command from there in **Git Bash** (PowerShell blocks `npm` on this machine). Node ≥ 24 (installed: v24.14.0).
- External sources (read-only, never modified):
  `OLD=../Portfolio-master` · `CERTS="/e/cert and resume"` · `ASSETFLOW=/e/dev/labreport-v3`.
- Static output. `site: "https://farisdanial.space"`, defined only in `src/site.config.ts` and `astro.config.mjs`.
- TypeScript strict (`astro/tsconfigs/strict`). No React, Vue or Svelte. Client JS lives only in `src/scripts/*.ts`, plus the one inline theme bootstrap.
- All user-facing copy comes verbatim from spec §4. Dashes in periods are U+2013 with spaces (`Jul 2026 – Present`).
- **Privacy:** never copy any file from `$CERTS` except `Mohamad Faris Danial Resume 2026.pdf`, `GC-BADGE-updated (1).png` and `Innovator Badge-PD-v2 (1).png`. Source and `dist/` must contain no match for `/\b\d{6}-?\d{2}-?\d{4}\b/`. The only PDF in `dist/` is `resume.pdf`. Test fixtures use the fake IC `990101-01-1234`. Never type the owner's real IC anywhere.
- Budgets: `dist/` ≤ 15 MB total; no file > 6 MB.
- Theme: `localStorage["theme"]` ∈ `"light" | "dark"`, otherwise the system preference. It is applied before first paint via class `dark` and `data-theme` on `<html>`. Tailwind variant: `@custom-variant dark (&:where(.dark, .dark *));`.
- Colours (spec §5): page bg `#ffffff` / `#050505`; accent emerald-500 `#10b981`; dark-mode accent text emerald-400; accent text on light backgrounds emerald-700 (AA contrast); neutrals from Tailwind zinc.
- Motion is disabled under `prefers-reduced-motion: reduce`. All content is visible with JavaScript disabled: hidden-until-revealed styles apply only under `html.js`.
- Every `localStorage` access goes through `safeGet`/`safeSet` (Task 1). In the inline bootstrap, wrap it in try/catch.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Commit messages end with the line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Certificate or ID leakage.** The DKM, SKM and JPK PDFs print the owner's national IC. Expect no certificate PDF and no IC-shaped string anywhere in the deploy. Pinned by `checkDist` tests (Task 2), the data privacy test (Task 3) and the `check:dist` gate (Task 10).
2. **`localStorage` blocked or throwing** (Safari private mode, blocked site data). Expect the page to render, the theme to follow the system, and the toggles to work for the session, with no uncaught errors. Pinned in Task 1 (theme) and Task 9 (a11y widget).
3. **JavaScript disabled.** Expect every section, every featured project and every timeline entry to be readable, not stuck at `opacity: 0` or hidden behind carousel state. Pinned in Task 6 (carousel) and Task 10 (all sections).
4. **360px-wide phone.** The 16vw display titles and the rotated, scaled marquee caused overflow risk in the old site. Expect no horizontal scroll. Pinned in Task 7 (marquee) and Task 10 (whole page).
5. **Heavy hero video on phones, Save-Data or reduced motion.** The old dark video was 19 MB. Expect only the poster image unless the viewport is ≥ 1024px, motion is allowed and Save-Data is off. Pinned in Task 5 (`shouldPlayVideo` unit tests and e2e).

---

### Task 1: Scaffold, design tokens, base layout, theme bootstrap

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`
- Create: `src/site.config.ts`, `src/lib/storage.ts`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`
- Test: `tests/e2e/theme.spec.ts`, `tests/unit/storage.test.ts`

**Interfaces:**
- Produces:
  - `SITE` (`src/site.config.ts`): `{ url: "https://farisdanial.space"; title: "Mohamad Faris Danial | Lecturer & Technical Builder"; description: string /* spec §4.1 meta description */; themeColor: { light: "#ffffff"; dark: "#050505" } } as const`
  - `type Theme = "light" | "dark"` and `THEME_KEY = "theme"`, exported from `src/site.config.ts`.
  - `safeGet(key: string): string | null` and `safeSet(key: string, value: string): void` (`src/lib/storage.ts`). Both swallow every exception.
  - `BaseLayout.astro` props `{ title?: string; description?: string }`, defaulting to `SITE`. Renders `<html lang="en-MY">`, `<meta name="theme-color">` **before** the inline bootstrap, the slot inside `<body>`, and imports `global.css`.
  - `global.css` utilities used by later tasks: `.display-title` (weight 900, uppercase, letter-spacing −0.04em, line-height 0.9, light/dark text-shadow from the old `theme.css`), `.eyebrow` (mono, uppercase, `tracking-[0.22em]`, emerald-700 / dark emerald-400, `text-xs sm:text-sm`), `.section` (`py-20 sm:py-24 lg:py-32`, `scroll-margin-top: 6rem`), and `[data-reveal]`, hidden only by `@media (prefers-reduced-motion: no-preference) { html.js [data-reveal]:not(.is-visible) { opacity:0; transform:translateY(24px) } }` with a 0.6s ease-out transition.
  - `--app-font-scale` custom property on `:root` (default 1), with `html { font-size: calc(16px * var(--app-font-scale)) }`.

- [ ] **Step 1: Initialise the repo and install dependencies**

```bash
git init -b main && git add docs && git commit -m "docs: portfolio 2026 spec and plan" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git checkout -b build/portfolio-2026
npm init -y
npm install astro @astrojs/sitemap @astrojs/check typescript tailwindcss @tailwindcss/vite @lucide/astro bootstrap-icons
npm install -D vitest @playwright/test @axe-core/playwright sharp ffmpeg-static
npx playwright install chromium
```

Set `"type": "module"`, `"private": true` and these scripts in `package.json`:
`dev: astro dev` · `build: astro build` · `preview: astro preview` · `check: astro check` · `test: vitest run` · `test:e2e: playwright test` · `check:dist: node scripts/check-dist.mjs dist` · `assets:import: node scripts/import-assets.mjs` · `og: node scripts/build-og.mjs` · `verify: astro check && vitest run && astro build && node scripts/check-dist.mjs dist && playwright test`.

Configuration: `astro.config.mjs` sets `site`, `output: "static"`, `integrations: [sitemap()]` and `vite.plugins: [tailwindcss()]`. `vitest.config.ts` uses `getViteConfig` from `astro/config` (so asset imports resolve) with `test.include: ["tests/unit/**/*.test.ts"]`. `playwright.config.ts` has `testDir: "tests/e2e"`, `webServer: { command: "npm run build && npm run preview -- --port 4321", url: "http://localhost:4321", reuseExistingServer: true }`, `use.baseURL` set to that URL, and two Chromium projects: `desktop` (1280×800) and `mobile` (360×740, `hasTouch: true`). `.gitignore`: `node_modules`, `dist`, `.astro`, `test-results`, `playwright-report`.

- [ ] **Step 2: Write the failing tests**

`tests/unit/storage.test.ts`:
- `safeGet returns null when getItem throws`: stub `globalThis.localStorage` with an object whose `getItem` throws; expect `safeGet("theme")` to be `null`.
- `safeSet does not throw when setItem throws`: expect `() => safeSet("theme","dark")` not to throw.
- `safeGet returns null when localStorage is undefined`.

`tests/e2e/theme.spec.ts` (all projects):
- `stored dark wins over light system`: `emulateMedia({colorScheme:"light"})` and `addInitScript(() => localStorage.setItem("theme","dark"))`, then goto `/`. Expect `html` to have class `dark` and `data-theme="dark"`, and `meta[name=theme-color]` content to be `#050505`.
- `no stored value follows system`: colorScheme `dark` → class `dark`; colorScheme `light` → no class `dark` and theme-color `#ffffff`.
- `invalid stored value falls back to system`: store `"purple"`, colorScheme `dark` → `data-theme="dark"`.
- `throwing storage still renders` (Review Focus 2): `addInitScript` replaces `Storage.prototype.getItem` and `setItem` with functions that throw. Collect `page.on("pageerror")`. Expect zero page errors, `data-theme` to equal the emulated scheme, and `html` to have class `js`.

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npx vitest run tests/unit/storage.test.ts && npx playwright test tests/e2e/theme.spec.ts`
Expected: FAIL (`safeGet` not defined; `data-theme` missing).

- [ ] **Step 4: Implement `src/lib/storage.ts`, `src/site.config.ts`, `global.css`, `BaseLayout.astro`, and an `index.astro` that renders `<BaseLayout><main id="main"></main></BaseLayout>`**

`global.css` starts with `@import "tailwindcss";` and the dark `@custom-variant`. The inline bootstrap goes in `<head>` as `<script is:inline>`, after the theme-color meta, and must be exactly this algorithm:

```js
(() => {
  const d = document.documentElement;
  d.classList.add("js");
  let t = null;
  try { t = localStorage.getItem("theme"); } catch {}
  if (t !== "light" && t !== "dark") t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  d.classList.toggle("dark", t === "dark");
  d.dataset.theme = t;
  d.style.colorScheme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "dark" ? "#050505" : "#ffffff");
})();
```

`<body>` classes: `bg-white text-zinc-950 dark:bg-[#050505] dark:text-zinc-50 antialiased selection:bg-emerald-500/20 overflow-x-clip`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run tests/unit/storage.test.ts && npx playwright test tests/e2e/theme.spec.ts`
Expected: PASS (3 unit, 8 e2e: 4 tests × 2 projects).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Astro scaffold, design tokens and theme bootstrap" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Asset import, video re-encode, dist privacy/size checker

**Files:**
- Create: `scripts/import-assets.mjs`, `scripts/check-dist.mjs`
- Create (by running the script): the files in the table below
- Test: `tests/unit/check-dist.test.ts`

**Interfaces:**
- Produces:
  - `checkDist(dir: string): Problem[]` exported from `scripts/check-dist.mjs`, where `type Problem = { file: string; rule: "nric" | "pdf" | "file-size" | "total-size" }` and `file` is relative to `dir` with `/` separators (`"(total)"` for `total-size`). When run as CLI (`node scripts/check-dist.mjs <dir>`) it prints each problem and exits 1 if any are found, otherwise prints `dist OK` and exits 0.
  - Rules: `nric` applies to any `.html .js .mjs .css .json .xml .txt .svg .webmanifest` file whose text matches `/\b\d{6}-?\d{2}-?\d{4}\b/`. `pdf` applies to any `.pdf` whose relative path is not `resume.pdf`. `file-size` applies to any file > 6 × 1024² bytes. `total-size` applies when the sum exceeds 15 × 1024² bytes.
  - Asset paths later tasks import:

| Destination | Source |
|---|---|
| `src/assets/portrait.jpg` | `$OLD/public/hero-image.jpg` |
| `src/assets/bg-light.jpg`, `src/assets/bg-dark.jpg` | `$OLD/public/background-light.jpg`, `background-dark.jpg` |
| `src/assets/projects/assetflow.png` | `$ASSETFLOW/docs/screenshots/after/dark-1366-01-home.png` |
| `src/assets/projects/fmp.png`, `webforge.png`, `tiktok.webp`, `immich.png`, `stirling-pdf.jpg`, `gomail.png` | `$OLD/public/FMP.png`, `webforge.png`, `tiktok.webp`, `immich.png`, `stirlingpdf.jpg`, `Gomail.png` |
| `src/assets/badges/wayground-pd-innovator.png` | `$CERTS/Innovator Badge-PD-v2 (1).png` |
| `src/assets/badges/wayground-game-changer.png` | `$CERTS/GC-BADGE-updated (1).png` |
| `public/resume.pdf` | `$CERTS/Mohamad Faris Danial Resume 2026.pdf` |
| `public/brand/logo-light-compact.svg`, `logo-dark-compact.svg`, `public/favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png` | same names in `$OLD/public/` |
| `scripts/og-image.svg` | `$OLD/public/og-image.svg` (input for Task 10) |
| `public/video/hero-light.mp4`, `public/video/hero-dark.mp4` | re-encoded from `$OLD/public/background-light.mp4`, `background-dark.mp4` |

Not imported: `black bg.*`, `white bg.*`, `hero image.jpg`, `php.jpg` (duplicates or unused), any other `$CERTS` file.

- [ ] **Step 1: Write the failing test `tests/unit/check-dist.test.ts`**

Each case builds a fixture in `fs.mkdtempSync(os.tmpdir())`:
- `clean dist has no problems`: `index.html` containing `+60 13 5858 199` plus `resume.pdf` → `[]`.
- `dashed IC in html is flagged`: `index.html` containing `990101-01-1234` → `[{file:"index.html", rule:"nric"}]`.
- `undashed IC in js is flagged`: `_astro/a.js` containing `x="990101011234"` → `[{file:"_astro/a.js", rule:"nric"}]`.
- `certificate pdf is flagged`: `resume.pdf` + `certs/dkm.pdf` → `[{file:"certs/dkm.pdf", rule:"pdf"}]`.
- `oversize file is flagged`: a 7 MiB `video/x.mp4` → one problem with `rule:"file-size"`.
- `total over budget is flagged`: three 5.5 MiB files → exactly one `total-size` problem.

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run tests/unit/check-dist.test.ts`
Expected: FAIL (cannot find `scripts/check-dist.mjs`).

- [ ] **Step 3: Implement `scripts/check-dist.mjs`**

Recursive walk with `fs.readdirSync(dir, { recursive: true, withFileTypes: true })`.

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run tests/unit/check-dist.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Implement `scripts/import-assets.mjs` and run it**

The script copies per the table, creating directories. It fails loudly if a source is missing. It refuses any source path under `$CERTS` that is not one of the three allowed names (Global Constraints). For each video it runs the binary from `ffmpeg-static` with `-y -i <src> -vf scale=1280:-2 -an -c:v libx264 -preset slow -movflags +faststart -crf <crf> <dest>`, trying `crf` 28, 32, 36 in turn and stopping at the first output ≤ 6 MiB. It exits 1 if none qualify. Finally it prints each destination with its size.

Run: `npm run assets:import`
Expected: every row listed; both `.mp4` files ≤ 6 MiB; exit 0.

- [ ] **Step 6: Verify nothing private was imported**

Run: `ls public/*.pdf && git status --porcelain -uall | grep -ci "\.pdf"`
Expected: `public/resume.pdf` only; count `1`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: import site assets and add dist privacy/size checker" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Content model, data modules and formatting helpers

**Files:**
- Create: `src/data/types.ts`, `src/data/profile.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/education.ts`, `src/data/credentials.ts`
- Create: `src/lib/period.ts`, `src/lib/credentials.ts`
- Test: `tests/unit/period.test.ts`, `tests/unit/credentials.test.ts`, `tests/unit/content.test.ts`

**Interfaces:**
- Consumes: asset paths from Task 2.
- Produces (`src/data/types.ts`):

```ts
export type YearMonth = { year: number; month?: number };            // month 1–12
export type Period = { start: YearMonth; end: YearMonth | "present" };
export type RoleKind = "teaching" | "it" | "dev";
export interface Role { id: string; title: string; org: string; period: Period; kind: RoleKind; highlights: string[] }
export type ProjectMedia =
  | { kind: "image"; src: ImageMetadata; alt: string }
  | { kind: "icon"; icon: "music" };
export interface Project { id: string; title: string; type: string; group: "featured" | "self-hosted"; summary: string; tags: string[]; media: ProjectMedia; href?: string; aiAssisted: boolean }
export type DayDate = { year: number; month: number; day: number };
export interface Credential { id: string; title: string; issuer?: string; date?: DayDate; dateEnd?: DayDate; kind: "course" | "badge" | "accreditation"; badge?: { src: ImageMetadata; alt: string }; credentialId?: string; note?: string }
export interface EducationItem { id: string; title: string; institution: string; status: string; current: boolean }
export type SkillIcon = "presentation" | "wrench" | "server" | "code";
export interface SkillCard { title: string; icon: SkillIcon; summary: string }
export interface Profile {
  fullName: string; displayName: string; shortName: string; eyebrow: string; tagline: string;
  about: [string, string]; philosophy: string; email: string; phone: string; location: string;
  links: { linkedin: string; github: string; website: string };
  resume: { href: "/resume.pdf"; downloadName: "Mohamad-Faris-Danial-Resume-2026.pdf" };
}
```

- Data exports: `profile: Profile`; `roles: Role[]` and `LECTURER_HIGHLIGHTS: string[]` (from `experience.ts`); `projects: Project[]`; `marqueeRows: [string[], string[]]` and `skillCards: SkillCard[]`; `education: EducationItem[]`; `credentials: Credential[]` and `teachingCredentialIds: string[]` (`["wayground-innovator","wayground-game-changer","jpk-induction","aihq-storytelling"]`). Ids and values come from spec §4.1–§4.6. Badge alts: `"Wayground Professional Development Innovator badge"` and `"Wayground Certified Game Changer badge"`. AssetFlow image alt: `"AssetFlow home screen showing weekly inspections and recent activity"`.
- Helpers:
  - `formatYearMonth(ym: YearMonth): string` gives `"Jul 2026"`, or `"2022"` when there is no month.
  - `formatPeriod(p: Period): string`.
  - `isValidPeriod(p: Period): boolean`: the month is an integer 1–12 when present, and the end is not before the start. A year-only start counts as January and a year-only end as December.
  - `sortRolesByStartDesc(roles: Role[]): Role[]`: non-mutating; sorts by start descending; ties put `"present"` first, then sort by `id`.
  - `formatCredentialDate(c: Credential): string | null` gives `"18 Aug 2026"`, or `"11–12 Jul 2026"` when `dateEnd` falls in the same month and year; `null` when undated.
  - `sortCredentialsByDateDesc(list: Credential[]): Credential[]`: stable; undated last.

- [ ] **Step 1: Write the failing tests**

`period.test.ts`:
- `formatPeriod({start:{year:2026,month:7},end:"present"})` → `"Jul 2026 – Present"`
- `formatPeriod({start:{year:2022},end:{year:2023}})` → `"2022 – 2023"`
- `isValidPeriod` → false for `month: 13`, false for `{start:{year:2025,month:6},end:{year:2025,month:5}}`, true for `{start:{year:2025,month:6},end:{year:2025}}`
- `sortRolesByStartDesc(roles).map(r=>r.id)` → `["ttc-ft","microbumi","satusky","ttc-pt","tiktok","allit","eden","kakmira"]`

`credentials.test.ts`:
- `wayground-innovator` formats as `"18 Aug 2026"`; `jpk-induction` as `"11–12 Jul 2026"`; `integrity` as `null`.
- Sorted ids start `["wayground-innovator","wayground-game-changer"]` and end with `"integrity"`.

`content.test.ts`:
- every `roles[i].period` passes `isValidPeriod`
- ids are unique within roles, projects, credentials and education
- every `href` and every `profile.links` value starts with `https://`
- featured ids in order `["assetflow","melodia","fmp","webforge","tiktok"]`; self-hosted `["immich","stirling-pdf","gomail"]`
- every image media and badge has a non-empty `alt`
- every project has `aiAssisted === true` (spec §2: all projects are AI-assisted)
- every id in `teachingCredentialIds` exists in `credentials`
- `profile.resume.downloadName === "Mohamad-Faris-Danial-Resume-2026.pdf"`
- privacy (Review Focus 1): `JSON.stringify({profile,roles,projects,credentials,education})` does not match `/\b\d{6}-?\d{2}-?\d{4}\b/`
- `credentials.find(c=>c.id==="web-html-css")?.credentialId === "RS-6A5EE66167AA2"`

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run tests/unit/period.test.ts tests/unit/credentials.test.ts tests/unit/content.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement the types, helpers and data modules**

Copy text verbatim from spec §4. Lecturer roles share one exported `LECTURER_HIGHLIGHTS` array holding the five resume bullets.

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vitest run`
Expected: PASS (all unit files, including Tasks 1–2).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: typed content model with resume, project and credential data" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Site shell — navbar, theme toggle, mobile menu, background, heading, reveal, footer

**Files:**
- Create: `src/components/Navbar.astro`, `src/components/Footer.astro`, `src/components/PageBackground.astro`, `src/components/SectionHeading.astro`
- Create: `src/scripts/theme.ts`, `src/scripts/nav.ts`, `src/scripts/reveal.ts`
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/nav.spec.ts`

**Interfaces:**
- Consumes: `SITE`, `THEME_KEY`, `Theme`, `safeSet`, `profile`.
- Produces:
  - `SectionHeading.astro` props `{ lead: string; accent: string; as?: "h2"; size?: "xl" | "lg"; copy?: string; eyebrow?: string; stacked?: boolean }`. It renders `<h2 class="display-title">{lead} <span class="text-emerald-700 dark:text-emerald-400">{accent}</span></h2>`, with a `<br>` between the parts when `stacked`. `xl` = `text-[13vw] sm:text-[10vw] lg:text-[6vw]`; `lg` = `text-4xl sm:text-5xl md:text-6xl`.
  - `setTheme(theme: Theme): void` (`src/scripts/theme.ts`) applies the same DOM changes as the bootstrap, persists via `safeSet(THEME_KEY, …)`, and dispatches `window` `CustomEvent<{ theme: Theme }>("themechange")`.
  - Element `data-reveal` on any block → `reveal.ts` adds `is-visible` once at 15 % intersection.
  - `index.astro` renders, in order: `PageBackground`, `Navbar`, then `<main id="main">` holding stub `<section id>` elements for `home about teaching projects skills experience credentials contact` (each with a SectionHeading so anchors work; later tasks replace each stub), then `Footer`.
- Behaviour:
  - Nav links (desktop pill nav and mobile sheet), in order: About `#about`, Teaching `#teaching`, Projects `#projects`, Skills `#skills`, Experience `#experience`, Credentials `#credentials`, Contact `#contact`. The logo links to `#home` and uses `logo-dark-compact.svg` in dark mode and the light logo otherwise, swapped by CSS `dark:` classes rather than JS. The emerald "Download Resume" pill uses `href={profile.resume.href}` and `download={profile.resume.downloadName}`.
  - The theme button's `aria-label` is `Switch to light theme` when dark and `Switch to dark theme` when light, showing the Sun or Moon icon respectively.
  - Mobile (`< lg`): the menu button carries `aria-controls="mobile-menu"` and `aria-expanded`. Escape or a link click closes the menu; Escape returns focus to the button. Body scroll is locked while the menu is open.
  - `PageBackground` is `aria-hidden`, fixed, and shows `bg-light.jpg` / `bg-dark.jpg` through `getImage({ width: 1920, format: "webp" })` with the old site's gradient scrims (copy the two `linear-gradient(...), radial-gradient(...)` strings from `$OLD/src/app/App.tsx`).
  - Footer text: `© {year} Mohamad Faris Danial. Built with Astro.`

- [ ] **Step 1: Write the failing test `tests/e2e/nav.spec.ts`**

- `desktop nav lists sections in order` (desktop only): the link texts of `header nav[aria-label="Primary"] a` equal `["About","Teaching","Projects","Skills","Experience","Credentials","Contact"]`.
- `nav link scrolls to section`: click "Projects", then expect `#projects` `toBeInViewport()`.
- `resume link downloads the 2026 resume`: the header link named "Download Resume" has `href` `/resume.pdf` and `download` `Mohamad-Faris-Danial-Resume-2026.pdf`, and `request.get("/resume.pdf")` returns status 200.
- `theme toggle switches and persists`: emulate light; click `Switch to dark theme`; expect `html` class `dark` and the button to be renamed `Switch to light theme`; reload; still `dark`.
- `mobile menu opens, closes on Escape and restores focus` (mobile only): expect `aria-expanded="false"`; click; expect `true` and `#mobile-menu` visible; press Escape; expect it hidden and the menu button focused.
- `mobile menu closes after choosing a link` (mobile only).

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/e2e/nav.spec.ts`
Expected: FAIL (no header nav).

- [ ] **Step 3: Implement the components, scripts and `index.astro` per the Interfaces block**

- [ ] **Step 4: Run it to verify it passes, plus the theme tests**

Run: `npx playwright test tests/e2e/nav.spec.ts tests/e2e/theme.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: site shell with navbar, theme toggle, mobile menu and footer" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Hero (with conditional video) and About

**Files:**
- Create: `src/components/Hero.astro`, `src/components/About.astro`, `src/scripts/hero-video.ts`
- Modify: `src/pages/index.astro` (replace the `home` and `about` stubs)
- Test: `tests/unit/hero-video.test.ts`, `tests/e2e/hero.spec.ts`

**Interfaces:**
- Consumes: `profile`, `education` (the `msu` item), `SectionHeading`, `Theme`, the `themechange` event, `src/assets/portrait.jpg`, `src/assets/bg-*.jpg`.
- Produces:
  - `shouldPlayVideo(env: { width: number; reducedMotion: boolean; saveData: boolean }): boolean` returns `width >= 1024 && !reducedMotion && !saveData`.
  - `heroVideoSrc(theme: Theme): string` returns `/video/hero-${theme}.mp4`.
- Behaviour:
  - Hero `#home`: full-viewport section (`min-h-[100svh]`). The `<video data-hero-video muted loop playsinline preload="none" aria-hidden="true">` has **no** `src` in the HTML; its `poster` is the theme's background (`getImage` 1280w webp). On load, `hero-video.ts` sets `src` and plays only if `shouldPlayVideo(...)` is true; on `themechange` it swaps `src`. The old site's hero scrims go over it.
  - Content: a 2px × 48px emerald rule followed by `.eyebrow` with `profile.eyebrow`. A **single** `<h1>` holding two block spans: `FARIS` (zinc-900 / zinc-100) and `DANIAL` (emerald-700 / emerald-400), at `text-[16vw] sm:text-[12vw] lg:text-[7vw] leading-[0.86] tracking-[-0.045em]`. Then the tagline, a "View Projects" pill (`href="#projects"`, zinc-900 / white with an emerald fill sliding up on hover and an ArrowDownRight icon), and a frosted "Download Resume" pill.
  - Portrait: `<Image>` of `portrait.jpg` (widths 384/768), alt `Portrait of Mohamad Faris Danial`, in an `aspect-[3/4] rounded-full` frame that is grayscale and becomes colour on hover, with an `bg-emerald-500/10 mix-blend-overlay` layer. `max-w-[12rem]` on mobile, `max-w-[26rem]` at lg, in a right column of `lg:grid-cols-12` (8/4).
  - Staggered entrance via `data-reveal` with inline `transition-delay` 0/100/200/300 ms. A "Scroll" indicator (mono text + 1px × 48px fading line) shows at `sm` and up and floats only under no-preference.
  - About `#about`: stacked `SectionHeading lead="ABOUT" accent="ME" size="xl"` in `lg:col-span-5`. In `lg:col-span-7`: `about[0]` at `text-xl sm:text-2xl md:text-3xl font-light` with "hardware repair and IT support" wrapped in `<strong class="font-bold text-emerald-700 dark:text-emerald-400">`; `about[1]`; then a bordered two-column block with "Education Path" (MSU title + institution, then `status`) and "Core Philosophy" (`profile.philosophy`).

- [ ] **Step 1: Write the failing tests**

`hero-video.test.ts`:
- `(1280,false,false)` → true
- `(1023,false,false)` → false
- `(1920,true,false)` → false
- `(1920,false,true)` → false
- `heroVideoSrc("dark") === "/video/hero-dark.mp4"`

`hero.spec.ts`:
- `exactly one h1 reading FARIS DANIAL`: `locator("h1")` count is 1, and its text with whitespace normalised is `FARIS DANIAL`.
- `eyebrow and tagline match profile`: contains text `Lecturer | Technical Builder | IT Systems & Deployment`.
- `CTAs`: "View Projects" has `href="#projects"`; the hero "Download Resume" has the `download` attribute from Task 4.
- `video stays off on phones` (mobile project; Review Focus 5): `[data-hero-video]` `src` attribute is null after `networkidle`.
- `video stays off under reduced motion` (desktop, `emulateMedia({reducedMotion:"reduce"})`): `src` is null.
- `video plays theme source on desktop` (desktop, dark, no-preference): `src` ends with `/video/hero-dark.mp4`; after clicking the theme toggle it ends with `/video/hero-light.mp4`.
- `about shows MSU as ongoing`: `#about` contains `Bachelor in Computer Science` and `2025 – Present`.

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run tests/unit/hero-video.test.ts && npx playwright test tests/e2e/hero.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `hero-video.ts`, `Hero.astro`, `About.astro`; swap the stubs in `index.astro`**

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vitest run tests/unit/hero-video.test.ts && npx playwright test tests/e2e/hero.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: hero with conditional theme video, and about section" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Projects — featured carousel and self-hosted grid

**Files:**
- Create: `src/components/Projects.astro`, `src/components/ProjectSlide.astro`, `src/components/ProjectCard.astro`, `src/scripts/carousel.ts`
- Modify: `src/pages/index.astro` (replace the `projects` stub)
- Test: `tests/unit/carousel.test.ts`, `tests/e2e/projects.spec.ts`

**Interfaces:**
- Consumes: `projects`, `Project`, `ProjectMedia`, `SectionHeading`.
- Produces: `wrapIndex(index: number, length: number): number` gives the modulo into `[0, length)` for any integer, including negatives.
- Behaviour:
  - Layout follows the old `Projects.tsx`: `xl:grid-cols-[minmax(0,21rem)_1fr]`. On the left: stacked heading `SELECTED / PROJECTS`, the spec §4.3 section intro (which states that every project is AI-assisted), a round prev button (bordered), a round next button (emerald), a counter `01 / 05` in mono, and title chips. On the right: the slide viewport.
  - Markup: `<div role="region" aria-roledescription="carousel" aria-label="Featured projects" tabindex="0" data-carousel>`. Each slide is `<article role="group" aria-roledescription="slide" aria-label="{n} of 5">`. The counter has `aria-live="polite"`. The active chip has `aria-current="true"`.
  - **No-JS / Review Focus 3:** all five slides render in the DOM and are visible in a vertical stack. Only under `html.js` does the CSS hide slides without `data-active`. Chips and buttons get `hidden` in HTML and are un-hidden by the script.
  - Script: prev/next buttons and chips change the active index via `wrapIndex`. ArrowLeft/ArrowRight work while focus is inside the region. A horizontal swipe ≥ 60px (pointer events, ignored when vertical movement is larger) also navigates. Slide transitions are a 380ms opacity + 48px translate, and instant under reduced motion.
  - `ProjectSlide`: `h-[26rem] sm:h-[30rem] md:h-[34rem] xl:h-[36rem]`, rounded `1.75rem/2rem` card. Image media uses `<Image>` (widths 768/1280/1600, `object-cover`, hover scale 1.02). Icon media uses a gradient panel (`bg-gradient-to-br from-emerald-500/25 via-zinc-900 to-black`) with a Lucide `Music` at `h-32 w-32 md:h-44 md:w-44 text-emerald-400`. On top: at top-left, a type pill followed by an `AI-assisted` pill (Lucide `Sparkles`, emerald border/bg, rendered when `aiAssisted`); when `href` is set, a round emerald ArrowUpRight link (`aria-label="Open {title}"`) at top-right. At the bottom, a frosted panel holds `h3` title, summary and tag pills.
  - Self-hosted grid below the carousel: sub-heading `.eyebrow` `Self-hosted`, then `sm:grid-cols-2 lg:grid-cols-3` of `ProjectCard` (16:9 image, type pill + the same `AI-assisted` pill, `h3`, summary, tags).

- [ ] **Step 1: Write the failing tests**

`carousel.test.ts`: `wrapIndex(-1,5)` → 4, `wrapIndex(5,5)` → 0, `wrapIndex(12,5)` → 2, `wrapIndex(0,5)` → 0.

`projects.spec.ts`:
- `starts on AssetFlow`: counter `01 / 05`; the visible slide's `h3` is `AssetFlow`; AssetFlow has no `Open AssetFlow` link.
- `next and prev wrap`: Next → `02 / 05` with visible `Melodia`, whose `Open Melodia` link has `href` `https://github.com/penyululz/Melodia`, `target=_blank` and `rel` containing `noopener`. Then Prev twice → `05 / 05`, `TikTok System`.
- `chip jumps`: click chip `WebForge` → `04 / 05` and that chip has `aria-current="true"`.
- `arrow keys navigate`: focus `[data-carousel]`, press ArrowRight → `02 / 05`.
- `swipe navigates` (mobile): a `page.mouse` drag of −120px across the slide → `02 / 05`.
- `all featured projects readable without JS` (new context with `javaScriptEnabled:false`): all five titles are visible.
- `every project is labelled AI-assisted`: `#projects` contains the text `Every project here is AI-assisted`; `#projects [data-ai-assisted]` count is 8 (5 slides + 3 cards), each with text `AI-assisted`.
- `self-hosted grid`: the `h3` texts under the Self-hosted list are `["Immich","Stirling PDF","Gomail"]`.

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run tests/unit/carousel.test.ts && npx playwright test tests/e2e/projects.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `carousel.ts`, the three components, and swap the stub**

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vitest run tests/unit/carousel.test.ts && npx playwright test tests/e2e/projects.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: accessible featured-project carousel and self-hosted grid" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Skills marquee and Experience timeline

**Files:**
- Create: `src/components/Skills.astro`, `src/components/Marquee.astro`, `src/components/Experience.astro`, `src/scripts/timeline.ts`
- Modify: `src/pages/index.astro`, `src/styles/global.css` (marquee keyframes)
- Test: `tests/unit/timeline.test.ts`, `tests/e2e/skills-experience.spec.ts`

**Interfaces:**
- Consumes: `marqueeRows`, `skillCards`, `roles`, `sortRolesByStartDesc`, `formatPeriod`, `SectionHeading`.
- Produces: `timelineProgress(top: number, height: number, viewportHeight: number): number` (`src/scripts/timeline.ts`), clamped to `[0, 1]`. It reproduces the old `useScroll` offsets `["start 75%", "end end"]`:

```ts
const span = height - 0.25 * viewportHeight;
if (span <= 0) return top <= 0.75 * viewportHeight ? 1 : 0;
return Math.min(1, Math.max(0, (0.75 * viewportHeight - top) / span));
```

- Behaviour:
  - Skills `#skills`: the section has `overflow-x: clip`. Two `Marquee` rows (`aria-hidden="true"`, items duplicated, row 2 reversed; 35s and 45s linear infinite, `translate3d` −50%) sit in a wrapper rotated `-2deg`. Items are `text-4xl md:text-6xl font-black uppercase`, zinc-600 / zinc-800, with an emerald-500/50 dot between them. Animation is off under reduced motion. Below: `SectionHeading lead="CORE" accent="SKILLS"`, copy `Skills grouped around teaching, hands-on support, deployment work and software development.`, and a `md:grid-cols-2` grid of four cards. Each card has its Lucide icon (`Presentation`, `Wrench`, `Server`, `Code`) in emerald-500, an `h3` and the summary.
  - Experience `#experience`: `SectionHeading lead="WORK" accent="EXPERIENCE"`. An `<ol>` of roles from `sortRolesByStartDesc`. The centre line is at `left-[14px]` on mobile and `lg:left-1/2`, with an emerald fill element `[data-timeline-fill]` whose `transform: scaleY(p)` is driven by `timelineProgress` on scroll via `requestAnimationFrame`. With no JS or reduced motion the fill renders at scale 1. Each `<li>` has a glowing node and a card on alternating sides at lg (even index on the left with right-aligned text). The card holds a period pill (mono, emerald border/bg), `h3` title, an org line, and a `<ul>` of highlights. Lecturer roles get a small `Teaching` tag.

- [ ] **Step 1: Write the failing tests**

`timeline.test.ts` (viewportHeight 800, height 2000):
- `top=700` → 0
- `top=600` → 0
- `top=-1200` (bottom at viewport bottom) → 1
- `top=-300` → 0.5
- `height=100, top=500` → 1

`skills-experience.spec.ts`:
- `four skill cards in spec order`: `#skills h3` texts are `["Teaching & Training","Hardware & IT Support","Deployment & Systems","Software Development"]`.
- `marquee is hidden from assistive tech`: every `[data-marquee]` has `aria-hidden="true"`.
- `no horizontal overflow at 360` (mobile; Review Focus 4): after scrolling `#skills` into view, `document.documentElement.scrollWidth <= window.innerWidth`.
- `timeline order and periods`: `#experience li h3` texts equal the eight titles in the spec §4.2 order, and the first `li` contains `Jul 2026 – Present`.
- `timeline fill reaches full at the end` (desktop): scroll to `#experience`'s last `li` plus the viewport; the fill's computed transform matrix has `d` ≥ 0.99.

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run tests/unit/timeline.test.ts && npx playwright test tests/e2e/skills-experience.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the components, `timeline.ts` and keyframes; swap the stubs**

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vitest run tests/unit/timeline.test.ts && npx playwright test tests/e2e/skills-experience.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: skills marquee and scroll-driven experience timeline" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Teaching, and Certifications & Education

**Files:**
- Create: `src/components/Teaching.astro`, `src/components/Credentials.astro`, `src/components/CredentialCard.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/teaching-credentials.spec.ts`

**Interfaces:**
- Consumes: `roles` (kind `teaching`), `LECTURER_HIGHLIGHTS`, `credentials`, `teachingCredentialIds`, `education`, `formatPeriod`, `formatCredentialDate`, `sortCredentialsByDateDesc`, `SectionHeading`.
- Produces: `CredentialCard.astro` props `{ credential: Credential; compact?: boolean }`. Badge credentials show their `<Image>` (96px, alt from data). Others show a Lucide `Award` (course) or `ShieldCheck` (accreditation) in an emerald-500/10 tile. Then `h3` title, issuer (when present), the formatted date (when present), `credentialId` as `ID RS-…` in mono (when present) and `note` (when present). `compact` renders as a horizontal chip for the Teaching section.
- Behaviour:
  - Teaching `#teaching`: stacked `SectionHeading lead="TEACHING" accent="& TRAINING" size="xl"`, intro `I lecture at Tech Terrain College, turning years of hands-on IT and development work into structured lessons, assessments and mentoring.` On the left: the two lecturer roles as period pill + title + `Tech Terrain College`. On the right: the `LECTURER_HIGHLIGHTS` list. Below: compact `CredentialCard`s for `teachingCredentialIds`, in that order.
  - Credentials `#credentials`: `SectionHeading lead="CERTIFICATIONS" accent="& EDUCATION"`. A `lg:grid-cols-[minmax(0,22rem)_1fr]` layout: on the left, an "Education" list where `current` items get a pulsing emerald dot (static under reduced motion) and the rest a zinc dot, each with title, institution and status. On the right, a `sm:grid-cols-2` grid of all credentials sorted by `sortCredentialsByDateDesc`.

- [ ] **Step 1: Write the failing test `teaching-credentials.spec.ts`**

- `teaching lists both lecturer roles`: `#teaching` contains `Full-Time Lecturer` with `Jul 2026 – Present`, and `Part-Time Lecturer` with `Jan 2024 – Dec 2025`.
- `teaching chips in order`: `#teaching [data-credential] h3` texts are `["Professional Development Innovator","Certified Game Changer","Kursus Induksi Personel Pentauliahan PP-PPD-PPB","Digital Storytelling in the AI Era for Educators"]`.
- `badges have alt text`: `#credentials img[alt="Wayground Certified Game Changer badge"]` is visible.
- `all ten credentials, newest first, undated last`: count is 10; the first is `Professional Development Innovator`; the last is `Cultivating Integrity in the Workplace` and shows no date.
- `date range format`: the JPK card contains `11–12 Jul 2026`.
- `credential id shown`: the web course card contains `RS-6A5EE66167AA2`.
- `education lists four items, MSU current`: `#credentials [data-education] li` count is 4; the first contains `Management & Science University (MSU)`.
- `no certificate files are linked` (Review Focus 1): no `a[href$=".pdf"]` on the page except `/resume.pdf`.

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/e2e/teaching-credentials.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the three components; swap the stubs**

- [ ] **Step 4: Run it to verify it passes**

Run: `npx playwright test tests/e2e/teaching-credentials.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: teaching section and certifications & education" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Contact and the Accessibility tools widget

**Files:**
- Create: `src/components/Contact.astro`, `src/components/AccessibilityTools.astro`, `src/components/BrandIcon.astro`, `src/lib/a11y.ts`, `src/scripts/a11y-tools.ts`
- Modify: `src/layouts/BaseLayout.astro` (bootstrap also applies saved a11y settings), `src/styles/global.css` (`a11y-links-underline`, `a11y-readable-font` rules from the old `theme.css`), `src/pages/index.astro`
- Test: `tests/unit/a11y.test.ts`, `tests/e2e/contact-a11y.spec.ts`

**Interfaces:**
- Consumes: `profile`, `safeGet`, `safeSet`.
- Produces (`src/lib/a11y.ts`):
  - `type A11ySettings = { textScale: number; linksUnderline: boolean; readableFont: boolean }`
  - `A11Y_KEY = "portfolio-accessibility-settings"`, `A11Y_DEFAULTS = { textScale: 1, linksUnderline: false, readableFont: false }`, `MIN_SCALE = 0.9`, `MAX_SCALE = 1.3`, `SCALE_STEP = 0.1`
  - `clampScale(n: number): number` clamps to [0.9, 1.3] and rounds to 2 decimals; a non-finite input returns 1.
  - `parseSettings(raw: string | null): A11ySettings`: invalid JSON or null gives the defaults; booleans count only when `=== true`; `textScale` goes through `clampScale` when it is a number.
  - `BrandIcon.astro` props `{ name: "github" | "linkedin"; class?: string }` inlines `bootstrap-icons/icons/{name}.svg?raw` with `aria-hidden="true"`.
- Behaviour:
  - Contact `#contact`: a rounded panel as in the old `Contact.tsx`. On the left: the `Contact` pill, stacked `CONTACT / ME`, and copy `Open to teaching and training roles, IT and deployment work, and web projects. I focus on clear communication and solutions that work.` On the right: three cards. **Email** (`mailto:` link; eyebrow `Email | Phone | Malaysia`; body `farismalekofficial@gmail.com · +60 13 5858 199`, the phone also a `tel:+60135858199` link). **LinkedIn** (eyebrow `Professional Profile`). **GitHub** (eyebrow `Projects & Code`). Each has an ArrowUpRight that nudges on hover.
  - Widget: a fixed bottom-right 56px button (`aria-label` `Open accessibility tools` / `Close accessibility tools`, `aria-expanded`, `aria-controls="a11y-panel"`). The panel has a header ("Accessibility", "Text and readability tools", a percentage pill) and buttons "Increase text", "Decrease text" (each disabled at its limit), "Underline links" and "Readable font" (each with `aria-pressed` and On/Off text), and "Reset settings" (disabled at defaults). Escape closes it and returns focus. Every change sets `--app-font-scale` and the two `html` classes, and calls `safeSet(A11Y_KEY, JSON.stringify(settings))`.
  - The bootstrap in `BaseLayout` additionally reads `A11Y_KEY` inside its try/catch and applies the three settings before paint, mirroring `parseSettings` (scale clamped to 0.9–1.3; booleans `=== true`).

- [ ] **Step 1: Write the failing tests**

`a11y.test.ts`:
- `clampScale(1.45)` → 1.3
- `clampScale(0.5)` → 0.9
- `clampScale(1.1000000001)` → 1.1
- `clampScale(NaN)` → 1
- `parseSettings(null)` and `parseSettings("not json")` each equal `A11Y_DEFAULTS`
- `parseSettings('{"textScale":5,"linksUnderline":"yes","readableFont":true}')` → `{textScale:1.3, linksUnderline:false, readableFont:true}`

`contact-a11y.spec.ts`:
- `contact links`: the email card `href` is `mailto:farismalekofficial@gmail.com`; a `tel:+60135858199` link exists; the LinkedIn and GitHub hrefs equal the `profile.links` values and have `target=_blank`.
- `text scale clamps at 130% and persists`: open the widget; click "Increase text" 5 times; the pill reads `130%`, "Increase text" is disabled, and the computed `html` font-size is `20.8px`; reload; still `20.8px`.
- `reset restores defaults`: after the above, click "Reset settings" → `100%` and the reset button is disabled.
- `toggles set aria-pressed and html classes`: "Underline links" → `aria-pressed="true"` and `html` has `a11y-links-underline`.
- `escape closes and restores focus`.
- `widget works when storage throws` (Review Focus 2): with the throwing-storage init script from Task 1, there are no page errors, "Increase text" once gives `110%`, and font-size is `17.6px`.

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run tests/unit/a11y.test.ts && npx playwright test tests/e2e/contact-a11y.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `a11y.ts`, `a11y-tools.ts`, the components and the bootstrap extension; swap the contact stub; mount `AccessibilityTools` in `index.astro` after `Footer`**

- [ ] **Step 4: Run them to verify they pass**

Run: `npx vitest run tests/unit/a11y.test.ts && npx playwright test tests/e2e/contact-a11y.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: contact section and accessibility tools widget" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: SEO, deploy config and whole-site quality gates

**Files:**
- Create: `scripts/build-og.mjs`, `public/og-image.png` (generated), `public/site.webmanifest`, `public/robots.txt`, `public/browserconfig.xml`, `vercel.json`, `README.md`
- Modify: `src/layouts/BaseLayout.astro` (meta), `scripts/og-image.svg` (text lines)
- Test: `tests/e2e/quality.spec.ts`

**Interfaces:**
- Consumes: `SITE`, `profile`, `checkDist`.
- Behaviour:
  - Head: `<link rel="canonical">`, `og:*` and `twitter:*` built from `new URL(Astro.url.pathname, Astro.site)`; `og:image` = `${SITE.url}/og-image.png` (1200×630) with alt `Portfolio preview for Mohamad Faris Danial`; `og:locale` `en_MY`; `<meta name="author" content="Mohamad Faris Danial Abdul Malek">`; manifest, favicon and apple-touch links. JSON-LD `Person`: `name` fullName, `alternateName` `Faris Danial`, `jobTitle` `Lecturer & Technical Builder`, `worksFor` `{ "@type": "CollegeOrUniversity", "name": "Tech Terrain College" }` (no `alumniOf`: the MSU degree is in progress), `email` `mailto:…`, `url` `SITE.url`, `sameAs` LinkedIn, GitHub and WebForge, and `knowsAbout` the union of the marquee rows.
  - `scripts/og-image.svg`: change the eyebrow text `TECHNICAL BUILDER` to `LECTURER &amp; TECHNICAL BUILDER`. The two 28px description lines become `Teaching backed by hands-on IT support,` and `deployment and full-stack development.`; the 20px line becomes `farisdanial.space`. `build-og.mjs` renders it to `public/og-image.png` at 1200×630 with `sharp`.
  - `site.webmanifest`: `name` = `SITE.title`, `short_name` `Faris Danial`, the description from spec §4.1, colours `#050505`, and the two android-chrome icons. `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://farisdanial.space/sitemap-index.xml`.
  - `vercel.json`: `{ "cleanUrls": true, "headers": [{ "source": "/(.*)", "headers": [...] }] }` with `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`, and `Content-Security-Policy: default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'`. Plus `{ "source": "/_astro/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }`.
  - `README.md`: what the site is, `npm install`, `npm run dev`, `npm run verify`, where content lives (`src/data/*`, spec §4), the privacy rule, and deploying `dist/` to Vercel.

- [ ] **Step 1: Write the failing test `tests/e2e/quality.spec.ts`**

- `no serious axe violations` (desktop; once with `colorScheme:"light"` and once `"dark"`, both with `reducedMotion:"reduce"`): `new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()`, filtered to `impact` ∈ {serious, critical}, gives `[]`.
- `no horizontal scroll at 360` (mobile; Review Focus 4): scroll through every section id; at each, `scrollWidth <= innerWidth`.
- `every section readable without JS` (`javaScriptEnabled:false`; Review Focus 3): for each of the 8 section ids, its `h2` (or the `h1` for `#home`) is visible and has computed `opacity` `"1"`.
- `structured data`: parse `script[type="application/ld+json"]`; `jobTitle === "Lecturer & Technical Builder"` and `sameAs` contains the GitHub URL.
- `social meta is absolute`: `og:image` content starts with `https://farisdanial.space/`; `<title>` equals `SITE.title`.
- `sitemap and robots served`: `/robots.txt` contains `sitemap-index.xml`; `/sitemap-index.xml` returns 200.

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/e2e/quality.spec.ts`
Expected: FAIL on structured data, og:image and robots (other cases may already pass; fix any that fail too).

- [ ] **Step 3: Implement head metadata, the OG script and the public files; run `npm run og`**

Run: `npm run og && file public/og-image.png`
Expected: `PNG image data, 1200 x 630`.

- [ ] **Step 4: Run the full verification**

Run: `npm run verify`
Expected: `astro check` reports 0 errors, all Vitest files pass, the build succeeds, `check-dist` prints `dist OK`, and all Playwright tests pass in both projects.

- [ ] **Step 5: Confirm the budget and privacy gate on the real build**

Run: `du -sh dist && find dist -name "*.pdf"`
Expected: total ≤ 15M; only `dist/resume.pdf`.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: SEO metadata, OG image, deploy headers and site quality gates" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

## Out of scope (owner decisions, not tasks)

- Pointing the `farisdanial.space` DNS at Vercel and running the first production deploy.
- Final wording of the three self-hosted project descriptions (spec §4.3 marks them as draft).
- A real Melodia screenshot. Replace `media` with `{ kind: "image", … }` when one exists.
