# Project Case Studies — Design Spec

Date: 2026-10-16 · Status: draft for owner review · Parent spec: `2026-10-16-portfolio-design.md`

## 1. Goal

Give the two strongest projects, **AssetFlow** and **Melodia**, a page each that explains the problem, what was built, how and why. Today each is one or two sentences on a carousel slide, which hides most of the work.

**Readers (owner's choice: "a mix"):** anyone skimming gets a plain-language summary at the top. Technical readers (developer, DevOps or IT hiring) get a deep dive further down. Teaching hiring panels see how the work was planned, verified and explained.

**Success:** each page reads well in under a minute at the top and holds up to a technical reader below. Every factual claim traces to the project's own repository. The owner approves the copy before it goes live.

## 2. Decisions (confirmed with owner, 2026-10-16)

| Topic | Decision |
|---|---|
| Projects | AssetFlow and Melodia only. Other projects keep their carousel/grid cards. |
| Placement | Own page per project, not on the home page. |
| Screenshots | Claude captures them with dummy data (see §6). |
| Testing | Light: build, `check-dist`, one browser test (see §8). |

## 3. URLs and pages

| URL | Source |
|---|---|
| `/projects/assetflow` | `src/content/case-studies/assetflow.md` |
| `/projects/melodia` | `src/content/case-studies/melodia.md` |

- An Astro content collection (`src/content.config.ts`, glob loader) holds one Markdown file per case study. The file name is the URL slug and must match a `projects` id in `src/data/projects.ts`.
- `src/pages/projects/[slug].astro` renders every entry with one shared layout, so adding a third case study later is one new Markdown file.
- Each page has its own `<title>` (`AssetFlow case study | Mohamad Faris Danial`), meta description, canonical URL and Open Graph/Twitter tags (reusing the site OG image). The sitemap picks the pages up automatically.

## 4. Content model (frontmatter)

| Field | Type | Example (AssetFlow) |
|---|---|---|
| `title` | string | `AssetFlow` |
| `summary` | string, one sentence | the carousel summary |
| `description` | string, ≤ 160 chars | meta description |
| `facts` | list of `{ label, value }` | Role: Sole developer · Year: 2026 · Platform: Windows desktop · Status: In use |
| `stack` | string[] | Electron, Next.js, PostgreSQL 17, Drizzle ORM, Playwright |
| `links` | optional list of `{ label, href }` | Melodia: GitHub. AssetFlow: none (private). |
| `hero` | image + alt | the carousel screenshot |
| `screens` | list of image + alt + caption, 0–4 | see §6 |

The Markdown body holds the sections in §5. Images use `astro:assets` so they are resized and served as WebP/AVIF like the rest of the site.

## 5. Page outline

1. **Header:** back link to `/#projects`, eyebrow `Case study`, two-tone title, summary, fact list, stack pills, `AI-assisted` pill, external links.
2. **In short** (plain language, about 3 short paragraphs): the problem and who had it, what was built, the result.
3. **Screens:** hero screenshot plus up to 4 captioned screenshots. Click opens the full-size image; no lightbox script.
4. **Technical deep dive:**
   - **Architecture:** an inline SVG diagram (theme-aware, with a text description for screen readers) and a short explanation.
   - **Key decisions and trade-offs:** 3–5 items, each "chose X over Y because Z".
   - **Testing and quality:** what is tested and how, with real counts from the repository at the time of writing.
   - **Security and privacy:** for example AssetFlow's loopback-only engine and append-only history; Melodia's no-account, on-device design.
5. **How I work with AI:** how the owner directs AI coding tools, then reviews, tests and debugs the result. Specific to the project, not generic.
6. **Lessons and what's next:** 2–4 points.
7. **Footer:** "Back to projects" and a link to the other case study.

Copy follows the existing voice: first person, plain words, British spelling, no hype. Drafted by Claude from the sources in §7; the owner edits and approves.

## 6. Screenshots

Captured in two separate sessions, one per project repository, so the pages are not blocked on them. Until they land, each page shows the existing carousel screenshot and the diagrams.

- **AssetFlow** (`E:\dev\labreport-v3`): production build (no Next.js dev badge) against a throwaway database filled with invented sites and items. The owner's real AssetFlow data is never opened or copied. Dark theme, 1366 px wide: home, inventory, asset details, reports.
- **Melodia** (Melodia repository): the web build with a few royalty-free tracks and plain generated cover art, so no copyrighted album art appears. Home, library or album, now playing.
- Output goes to `src/assets/case-studies/<slug>/` in this repo. No screenshot may show a real person's name, email or ID number (same privacy rule as the parent spec).

## 7. Sources for facts

- AssetFlow: `README.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/REQUIREMENTS-MATRIX.md`, `PROJECT-HANDOVER.md`, `CLAUDE.md`, and the test suites (counts taken by listing tests, not guessed).
- Melodia: `README.md`, `SECURITY.md`, `docs/PRODUCTION_READINESS.md`, `docs/NATIVE_APPS.md`, `CHANGELOG.md`, and the test suites.
- A claim that cannot be traced to a source is left out or marked for the owner to confirm.

## 8. Changes to existing site

- **Carousel:** slides whose project has a case study show a `Read case study` link (internal, same tab) beside the existing external link.
- **Navbar:** section links become `/#about` etc. and the logo `/#home`, so they work from case study pages. On the home page they behave exactly as before.
- **Spec:** the parent spec's §3 notes the case study pages.

## 9. Checks

- `astro check`, `astro build` and `check-dist` pass (budget and IC rules apply to the new pages and images).
- One Playwright test: each case study page loads with its `h1`, and the AssetFlow slide's `Read case study` link opens `/projects/assetflow`.
- The existing axe test also runs against one case study page in both themes.

## 10. Out of scope

Case studies for other projects, video clips, live demos, a blog or CMS, and comments.
