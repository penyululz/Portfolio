# Project Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add case study pages at `/projects/assetflow` and `/projects/melodia`, linked from their carousel slides.

**Architecture:** An Astro content collection (`case-studies`, glob loader over `src/content/case-studies/*.md`) feeds one dynamic route, `src/pages/projects/[slug].astro`. The route renders a header, "In short" paragraphs and screenshots from frontmatter, then the project's architecture diagram (an Astro SVG component chosen by slug), then the Markdown body (the technical deep dive). Screenshots are captured later in separate sessions and added to frontmatter.

**Tech Stack:** Astro 7.4 (content layer, `astro:assets`), Tailwind 4, Vitest, Playwright + axe.

**Spec:** `docs/superpowers/specs/2026-10-16-case-studies-design.md` (parent: `docs/superpowers/specs/2026-10-16-portfolio-design.md`)

## Global Constraints

- URLs: `/projects/assetflow`, `/projects/melodia`. A case study file name must equal a `projects` id in `src/data/projects.ts`.
- `<title>`: `<Project> case study | Mohamad Faris Danial`; meta description ≤ 160 characters.
- Copy: first person, plain words, British spelling, no hype. Every factual claim traces to the sources in spec §7; untraceable claims are left out or marked `<!-- OWNER: confirm -->`.
- Privacy: no real person's name, email or ID number in any image or text; `check-dist` must stay green.
- Budgets: `dist/` ≤ 15 MB total, no file > 6 MB.
- No new dependencies.
- Testing stays light (owner's request): one new e2e spec, one unit test, the existing axe test extended.

## Review Focus

1. **Slug with no matching project** (a typo in a file name): the build should fail loudly, not publish an orphan page. → unit test in Task 1.
2. **Section links from a case study page:** clicking "Projects" in the navbar should land on the home page's `#projects`. → e2e in Task 2.
3. **360 px phone:** wide diagrams or long stack pills must not cause horizontal scroll. → e2e in Task 3.
4. **Carousel swipe vs. link:** the slide's drag handling must not swallow a click on "Read case study". → e2e in Task 2.
5. **A case study with no screenshots yet** (Melodia until its capture lands): no empty "Screens" heading. → e2e in Task 3.

---

### Task 1: Collection, route and page shell

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/case-studies/assetflow.md`, `src/content/case-studies/melodia.md` (frontmatter + one-line body for now)
- Create: `src/pages/projects/[slug].astro`
- Create: `src/components/case-studies/CaseStudyHeader.astro`, `src/components/case-studies/CaseStudyScreens.astro`
- Create: `src/components/case-studies/diagrams/index.ts` (registry; empty diagrams allowed in this task)
- Create: `src/lib/case-studies.ts` (`caseStudyHref`)
- Test: `tests/e2e/case-studies.spec.ts`, `tests/unit/case-studies.test.ts`

**Interfaces:**
- Produces: collection `case-studies` with schema `({ image }) => z.object({ title: z.string(), summary: z.string(), description: z.string().max(160), facts: z.array(z.object({ label: z.string(), value: z.string() })), stack: z.array(z.string()), links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]), inShort: z.array(z.string()).min(1).max(4), hero: z.object({ src: image(), alt: z.string() }), screens: z.array(z.object({ src: image(), alt: z.string(), caption: z.string() })).max(4).default([]) })`. Import `z` from `astro/zod`, `glob` from `astro/loaders`.
- Produces: `diagrams` registry in `src/components/case-studies/diagrams/index.ts`: `export const diagrams: Record<string, AstroComponentFactory | undefined>` keyed by slug.
- Produces: `caseStudyHref(id: string): string` = `` `/projects/${id}` `` exported from `src/lib/case-studies.ts`.

- [ ] **Step 1: Write the failing tests**

`tests/unit/case-studies.test.ts`:
```ts
it("every case study file matches a project id", () => {
  const ids = new Set(projects.map((p) => p.id));
  const slugs = fs.readdirSync("src/content/case-studies").map((f) => path.basename(f, ".md"));
  expect(slugs.length).toBeGreaterThan(0);
  for (const slug of slugs) expect(ids, slug).toContain(slug);
});
```
`tests/e2e/case-studies.spec.ts`:
```ts
for (const [slug, title] of [["assetflow", "AssetFlow"], ["melodia", "Melodia"]] as const) {
  test(`${slug} case study renders`, async ({ page }) => {
    await page.goto(`/projects/${slug}`);
    await expect(page).toHaveTitle(`${title} case study | Mohamad Faris Danial`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    await expect(page.getByRole("heading", { name: "In short" })).toBeVisible();
  });
}
```

- [ ] **Step 2: Run them; expect the unit test to fail (directory missing) and the e2e tests to 404**

Run: `npx vitest run tests/unit/case-studies.test.ts` and `npx playwright test tests/e2e/case-studies.spec.ts --project=desktop`

- [ ] **Step 3: Implement**

`[slug].astro`: `getStaticPaths` from `getCollection("case-studies")`; throw `Error(\`case study "${id}" has no project\`)` if the id is not in `projects`. Render inside `BaseLayout` (title/description per constraints) with `PageBackground`, `Navbar`, `<main id="main">`, `Footer`, `AccessibilityTools`, matching `index.astro`. Order: `CaseStudyHeader` (back link to `/#projects`, eyebrow "Case study", `h1` with two-tone title, summary, facts as `<dl>`, stack pills, `AiAssistedPill`, external links) → `<h2>In short</h2>` + `inShort` paragraphs → `CaseStudyScreens` (hero + screens; each image links to its full-size original; render the `<h2>Screens</h2>` only when there is at least the hero) → `<h2>Technical deep dive</h2>` → `diagrams[slug]` if present → `<Content />` from `render(entry)` styled with a `prose`-like set of utility classes on the wrapper (headings, lists, links, code). Frontmatter for both files: carousel summary, facts and stack from `src/data/projects.ts` and spec §4; `hero` = the carousel image (`../../assets/projects/assetflow.png`, `melodia.webp`); `inShort` = one placeholder paragraph each, replaced in Tasks 4–5.

- [ ] **Step 4: Run the tests; expect PASS**

- [ ] **Step 5: Commit** — `feat: case study collection and page shell`

### Task 2: Site links (navbar and carousel)

**Files:**
- Modify: `src/components/Navbar.astro` (navItems hrefs and logo href)
- Modify: `src/components/Projects.astro`, `src/components/ProjectSlide.astro` (new optional prop `caseStudyHref?: string`)
- Test: `tests/e2e/case-studies.spec.ts`

**Interfaces:**
- Consumes: `caseStudyHref(id)` from Task 1; collection ids via `getCollection("case-studies")` in `Projects.astro`.

- [ ] **Step 1: Write the failing tests**

```ts
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
```

- [ ] **Step 2: Run; expect both to FAIL** (no link; nav href is `#projects` on the case study page)

- [ ] **Step 3: Implement**

Navbar hrefs become `/#about` … `/#contact`, logo `/#home`. `ProjectSlide` renders, when `caseStudyHref` is set, a visible text link "Read case study" (`aria-label="Read the <title> case study"`) inside the summary panel after the tags, styled like the existing emerald pill buttons; it must stop the carousel's pointer handling from treating the click as a drag (check `src/scripts/` carousel code for how existing slide links avoid this, and follow it). `Projects.astro` passes `caseStudyHref` for featured projects whose id is in the collection.

- [ ] **Step 4: Run all of `tests/e2e/nav.spec.ts` and `case-studies.spec.ts`; expect PASS** (existing nav tests prove home behaviour is unchanged)

- [ ] **Step 5: Commit** — `feat: link carousel and navbar to case study pages`

### Task 3: Page quality checks

**Files:**
- Modify: `tests/e2e/quality.spec.ts`, `tests/e2e/case-studies.spec.ts`
- Modify (only if a check fails): the Task 1 components

- [ ] **Step 1: Write the tests**

In `quality.spec.ts`, turn the axe test's page into a loop over `["/", "/projects/assetflow"]` (both colour schemes, desktop only, same exclusions). In `case-studies.spec.ts`:
```ts
test("case study has no horizontal scroll at 360", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "phone only");
  for (const slug of ["assetflow", "melodia"]) {
    await page.goto(`/projects/${slug}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, slug).toBeLessThanOrEqual(0);
  }
});

test("case study without screenshots shows no empty screens section", async ({ page }) => {
  // Melodia has a hero but no `screens` yet: the heading shows once, with exactly one figure.
  await page.goto("/projects/melodia");
  await expect(page.getByRole("heading", { name: "Screens" })).toHaveCount(1);
  await expect(page.locator("[data-screens] figure")).toHaveCount(1);
});
```

- [ ] **Step 2: Run; fix any failure in the Task 1 components** (not in the tests)

- [ ] **Step 3: Commit** — `test: axe, phone width and empty-screens checks for case studies`

### Task 4: AssetFlow content and diagram

**Files:**
- Modify: `src/content/case-studies/assetflow.md`
- Create: `src/components/case-studies/diagrams/AssetflowDiagram.astro`; register it in `diagrams/index.ts` under `assetflow`

- [ ] **Step 1: Gather facts** from `E:\dev\labreport-v3` (README, docs/ARCHITECTURE.md, docs/SECURITY.md, docs/REQUIREMENTS-MATRIX.md, PROJECT-HANDOVER.md, CLAUDE.md). Count tests by listing them (`npx vitest list` / `npx playwright test --list` in that repo, read-only; do not start its database or app). Never open the owner's real AssetFlow data folder.
- [ ] **Step 2: Write the copy:** `inShort` (3 paragraphs: problem, what was built, result) and the body sections in spec §5 items 4–6 as `###` headings: Architecture, Key decisions and trade-offs (3–5 "chose X over Y because Z"), Testing and quality, Security and privacy, How I work with AI, Lessons and what's next. Facts list per spec §4 (Role, Year, Platform, Status from the sources).
- [ ] **Step 3: Draw the diagram:** inline SVG, `viewBox` sized for 360 px readability (stack vertically, ≤ 6 boxes: Electron shell → loopback Next.js engine → PostgreSQL 17, plus backups and Excel/PDF reports), colours via `currentColor` and Tailwind `fill-*`/`stroke-*` with `dark:` variants, `role="img"` with `<title>` and `<desc>`, wrapped in `<figure>` with a one-line `<figcaption>`.
- [ ] **Step 4: Check:** `npx astro check`, `npx astro build`, `node scripts/check-dist.mjs dist`, `npx playwright test tests/e2e/case-studies.spec.ts tests/e2e/quality.spec.ts`; expect PASS. Look at the page at 360 px and 1280 px in both themes.
- [ ] **Step 5: Commit** — `content: AssetFlow case study`

### Task 5: Melodia content and diagram

Same as Task 4 for Melodia, with these differences:
- **Files:** `src/content/case-studies/melodia.md`, `src/components/case-studies/diagrams/MelodiaDiagram.astro` (registered under `melodia`).
- **Sources:** the Melodia repo at `C:\Users\Danial\Documents\Codex\2026-08-27\do-u-remember-melodia\work\Melodia` (README, SECURITY.md, docs/PRODUCTION_READINESS.md, docs/NATIVE_APPS.md, CHANGELOG.md, test listing).
- **Links:** GitHub `https://github.com/penyululz/Melodia`.
- **Diagram:** library on device (Windows Electron / Android) → local SQLite → playback engine (gapless, crossfade, replay gain); QR transfer between devices with SHA-256 check.
- **Commit:** `content: Melodia case study`

### Task 6: Spec note and full verify

**Files:**
- Modify: `docs/superpowers/specs/2026-10-16-portfolio-design.md` §3 (one line: case study pages at `/projects/<id>` for AssetFlow and Melodia, linked from their slides; see the case studies spec)

- [ ] **Step 1: Edit the parent spec**
- [ ] **Step 2: Run `npm run verify` in Git Bash** (no `astro preview` already running); expect exit 0
- [ ] **Step 3: Commit** — `docs: note case study pages in portfolio spec`

### Afterwards (separate sessions, not this plan)

Screenshot capture per spec §6, one session per app repo. Each delivers images into `src/assets/case-studies/<slug>/` and adds them to that file's `screens` frontmatter (max 4); the Task 3 empty-screens test then needs its expected figure count updated.
