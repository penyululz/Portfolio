# Mohamad Faris Danial — Portfolio 2026

Single-page portfolio presenting Faris as a **Lecturer & Technical Builder**: teaching at Tech Terrain College, backed by hands-on IT support, deployment and full-stack projects. Built with Astro (static output), Tailwind CSS 4 and a few small TypeScript scripts; no UI framework runtime.

The design carries over the previous React portfolio: zinc and emerald palette, two-tone display headings, theme-aware hero video, rotated skills marquee, scroll-driven experience timeline, project carousel and an accessibility tools widget.

## Requirements

- Node.js 24+
- Use Git Bash on Windows (PowerShell may block `npm`)

## Commands

```bash
npm install
npx playwright install chromium   # once, for end-to-end tests
npm run dev                       # http://localhost:4321
npm run verify                    # type check, unit tests, build, dist check, e2e tests
```

| Script | What it does |
|---|---|
| `npm run build` | Static build into `dist/` |
| `npm run test` | Vitest unit tests (`tests/unit`) |
| `npm run test:e2e` | Playwright tests against the built site (`tests/e2e`, desktop 1280px and phone 360px) |
| `npm run check:dist` | Privacy and size gate on `dist/` |
| `npm run assets:import` | Re-imports images, videos and the resume from the owner's folders |
| `npm run og` | Renders `scripts/og-image.svg` to `public/og-image.png` |

## Editing content

All copy lives in typed data modules. The design spec (`docs/superpowers/specs/2026-10-16-portfolio-design.md`, §4) is the source they were written from.

| File | Content |
|---|---|
| `src/data/profile.ts` | Name, tagline, about text, contact links, resume |
| `src/data/experience.ts` | Roles, periods and highlights (timeline and teaching section) |
| `src/data/projects.ts` | Featured carousel and self-hosted projects; every project is marked AI-assisted |
| `src/data/skills.ts` | Marquee rows and skill cards |
| `src/data/education.ts`, `src/data/credentials.ts` | Education and certificates |

Images for projects and badges live in `src/assets/`; Astro optimises them at build time.

## Privacy rule

Several certificate PDFs print the owner's national IC number. **Never copy a certificate PDF into this repository.** Certificates appear as data cards only. `npm run check:dist` fails the build output if it finds an IC-shaped number or any PDF other than `resume.pdf`, and a unit test checks the same in the data modules.

## Deploying

Deploy `dist/` to Vercel (`vercel.json` sets security headers, including a Content Security Policy, and long-lived caching for `/_astro/*`). The canonical URL is `https://farisdanial.space`, set in `astro.config.mjs` and `src/site.config.ts`.
