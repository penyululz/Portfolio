
# Untitled Portfolio App

This project is a React + Vite single-page portfolio generated from Figma Make and customized with animated sections, scroll effects, and Tailwind CSS v4 styling.

Original Figma file:
https://www.figma.com/design/LPbblE28IkBbTGdsx2sSss/Untitled

## What This Project Includes

- Full-screen hero section with parallax effects and animated intro copy
- Horizontal scroll-driven project showcase
- Animated skills marquee and competency cards
- Timeline-style experience section
- Custom motion cursor (desktop only)
- Dark visual style with emerald accent theme

## Tech Stack

- React 18 (`react`, `react-dom`)
- Vite 6
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Framer Motion successor package (`motion`)
- Icon library (`lucide-react`)
- TypeScript source files (`.tsx` / `.ts`)

## Prerequisites

- Node.js 20+ (Node 24 works)
- npm 10+ (npm 11 works)

## Quick Start

From the project root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Windows PowerShell Note

If PowerShell blocks `npm` with an execution-policy error like:
`npm.ps1 cannot be loaded because running scripts is disabled`

Use Command Prompt invocation from PowerShell:

```powershell
cmd /c npm install
cmd /c npm run dev
```

## Available Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build in `dist/`.

## Project Structure

```text
.
|-- guidelines/
|   `-- Guidelines.md
|-- src/
|   |-- app/
|   |   |-- App.tsx
|   |   `-- components/
|   |       |-- About.tsx
|   |       |-- Experience.tsx
|   |       |-- Footer.tsx
|   |       |-- Hero.tsx
|   |       |-- Projects.tsx
|   |       |-- Skills.tsx
|   |       |-- figma/
|   |       `-- ui/
|   |-- imports/
|   |   `-- pasted_text/
|   `-- styles/
|       |-- fonts.css
|       |-- index.css
|       |-- tailwind.css
|       `-- theme.css
|-- index.html
|-- vite.config.ts
|-- postcss.config.mjs
|-- package.json
`-- ATTRIBUTIONS.md
```

## Architecture Overview

### Entry and App Shell

- `src/main.tsx` mounts the React app.
- `src/app/App.tsx` composes page sections in this order:
  `Hero -> About -> Projects -> Skills -> Experience -> Footer`.
- Global effects in `App.tsx`:
  - smooth custom cursor using motion values/springs
  - fixed noise overlay for texture
  - centered ambient glow background

### Section Components

- `Hero.tsx`
  - text reveal animation with staggered motion variants
  - scroll-linked parallax elements
  - CTA anchor (`#project-fmp`)
- `About.tsx`
  - personal profile narrative and education details
  - slide/fade reveal when section enters viewport
- `Projects.tsx`
  - scroll-linked horizontal card track
  - featured external link for FMP project
- `Skills.tsx`
  - dual-direction infinite marquee rows
  - bento-style cards for core competencies
- `Experience.tsx`
  - animated vertical timeline
  - progressive line fill based on scroll progress
- `Footer.tsx`
  - dynamic current-year copyright line

### Styling System

- `src/styles/index.css` imports all style layers.
- `src/styles/tailwind.css`:
  - registers Tailwind v4
  - scans project files with `@source`
  - includes `tw-animate-css`
- `src/styles/theme.css`:
  - defines design tokens via CSS variables
  - maps theme tokens to Tailwind `@theme inline`
  - adds base typography and default element styles

### Build Configuration

- `vite.config.ts`:
  - React plugin + Tailwind plugin
  - `@` alias points to `src/`
  - allows raw imports for `svg` and `csv`
- `postcss.config.mjs` is intentionally minimal; Tailwind v4 is configured via Vite plugin.

## Customization Guide

### Update Personal Content

Edit these files:

- `src/app/components/Hero.tsx`
- `src/app/components/About.tsx`
- `src/app/components/Projects.tsx`
- `src/app/components/Skills.tsx`
- `src/app/components/Experience.tsx`
- `src/app/components/Footer.tsx`

### Replace Images

- Hero portrait and project cover images currently use Unsplash URLs.
- Swap `src` values in section components with your own URLs or local assets.

### Change Theme Colors and Tokens

- Update CSS variables in `src/styles/theme.css`.
- Primary accent in sections is currently emerald-focused (`emerald-*` Tailwind classes).

## Build and Deploy

Build production output:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Output is generated in `dist/`.

Deployment notes:

- Vercel: import the project and use the default Vite settings. `vercel.json` is included with an SPA rewrite.
- Netlify: set the build command to `npm run build` and publish directory to `dist`. The `public/_redirects` file is included for SPA fallback.
- Cloudflare Pages: use `npm run build` and publish `dist/`.

SEO and metadata notes:

- Favicons, app icons, and a social preview image now live in `public/`.
- Page metadata, Open Graph tags, Twitter cards, structured data, and the web manifest are defined in `index.html`.
- Canonical and social image URLs are upgraded at runtime to the deployed origin so local builds and preview deployments do not ship a wrong domain by default.

## Troubleshooting

### `npm.ps1` execution policy error (Windows)

Use:

```powershell
cmd /c npm install
cmd /c npm run dev
```

### Dev server fails with permissions in restricted environments

In sandboxed environments, process spawn restrictions can block Vite/esbuild. Run locally on your own machine terminal instead of restricted sandboxes.

### Port already in use

Run Vite on another port:

```bash
npm run dev -- --port 5174
```

## Credits and Licenses

- UI building blocks from `shadcn/ui` (MIT): see `ATTRIBUTIONS.md`
- Photos from Unsplash: see `ATTRIBUTIONS.md`
  
