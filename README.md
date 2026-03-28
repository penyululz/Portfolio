# Mohamad Faris Danial Portfolio

Personal portfolio built with React, Vite, Tailwind CSS v4, and Motion. The site showcases selected projects, experience, skills, and contact links with theme-aware visuals, animated transitions, and downloadable resume support.

## Highlights

- Hero section with theme-based looping video background
- Theme-aware still backgrounds for the rest of the page
- Swipeable project carousel on mobile and tablet
- Resume download button in the hero and navbar
- Two-tone section headings and timeline-driven experience layout
- Contact cards for email, LinkedIn, and GitHub
- Accessibility tools for text scaling, readable font, and link underlines
- SEO metadata, structured data, manifest, favicons, and OG image

## Stack

- React 18
- Vite 6
- Tailwind CSS 4
- Motion (`motion`)
- Lucide React
- TypeScript

## Requirements

- Node.js 20+
- npm 10+

## Quick Start

```bash
npm install
npm run dev
```

If PowerShell blocks `npm`, use:

```powershell
cmd /c npm install
cmd /c npm run dev
```

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build in `dist/`
- `npm run preview` previews the production build locally

## Project Structure

```text
.
|-- public/
|   |-- background-dark.jpg
|   |-- background-light.jpg
|   |-- background-dark.mp4
|   |-- background-light.mp4
|   |-- hero-image.jpg
|   |-- FMP.png
|   |-- Gomail.png
|   |-- tiktok.webp
|   |-- immich.png
|   |-- stirlingpdf.jpg
|   |-- resume.pdf
|   `-- brand/
|-- src/
|   |-- app/
|   |   |-- App.tsx
|   |   |-- site.ts
|   |   `-- components/
|   |       |-- About.tsx
|   |       |-- AccessibilityTools.tsx
|   |       |-- Contact.tsx
|   |       |-- Experience.tsx
|   |       |-- Footer.tsx
|   |       |-- Hero.tsx
|   |       |-- Navbar.tsx
|   |       |-- Projects.tsx
|   |       `-- Skills.tsx
|   `-- styles/
|       |-- index.css
|       `-- theme.css
|-- index.html
|-- vite.config.ts
|-- vercel.json
`-- package.json
```

## Main Areas

### App Shell

- `src/app/App.tsx` manages theme state and composes page sections
- Theme preference is stored in `localStorage`
- The hero uses video backgrounds; the rest of the page uses theme-aware JPG textures

### Content Sections

- `Hero.tsx`: intro, CTA buttons, resume download, hero portrait, theme video
- `About.tsx`: profile summary, education, working philosophy
- `Projects.tsx`: carousel with local project artwork and touch swipe support
- `Skills.tsx`: marquee stack and competency cards
- `Experience.tsx`: animated career timeline
- `Contact.tsx`: contact cards for email, LinkedIn, and GitHub
- `Footer.tsx`: footer credits and copyright

### Styling

- `src/styles/theme.css` contains CSS variables and utility classes
- Tailwind theme tokens are mapped through `@theme inline`
- Light and dark mode are controlled via the `.dark` class on the document root

## Content and Asset Editing

### Personal Content

Update text and links in:

- `src/app/components/Hero.tsx`
- `src/app/components/About.tsx`
- `src/app/components/Projects.tsx`
- `src/app/components/Skills.tsx`
- `src/app/components/Experience.tsx`
- `src/app/components/Contact.tsx`
- `src/app/site.ts`

### Images and Video

Place or replace assets in `public/`.

Current important public assets:

- `hero-image.jpg`
- `background-light.jpg`
- `background-dark.jpg`
- `background-light.mp4`
- `background-dark.mp4`
- `resume.pdf`
- project screenshots such as `FMP.png`, `Gomail.png`, `tiktok.webp`

### Resume

The resume download path is centralized in `src/app/site.ts` and currently points to:

- `public/resume.pdf`

## Deployment

Build:

```bash
npm run build
```

Deploy the generated `dist/` folder to any static host.

Current deployment support:

- Vercel: `vercel.json` includes SPA rewrites
- Netlify: `public/_redirects` provides SPA fallback
- Cloudflare Pages: publish `dist/`

## SEO and Metadata

Configured in `index.html` and `public/`:

- meta description, Open Graph, Twitter cards
- structured data (`Person` schema)
- web manifest
- favicon set and app icons
- OG preview image
- canonical URL upgrade at runtime based on deployment origin

## Security Notes

Current security posture:

- Low attack surface because this is a static front-end portfolio
- No backend, login flow, admin area, or exposed API integration in the shipped app
- No project `.env` files, API keys, or auth tokens are expected in the client code
- External profile links use `noopener noreferrer`
- `localStorage` is only used for theme and accessibility preferences

Hardening still recommended:

- Add a Content Security Policy and deployment security headers
- Trim unused dependencies from `package.json` to reduce supply-chain risk
- Keep npm packages updated and run vulnerability audits periodically

## Troubleshooting

### PowerShell blocks npm

```powershell
cmd /c npm install
cmd /c npm run dev
```

### Build output

Production files are written to:

- `dist/`

### Change background assets

Replace the files in `public/` with the same names:

- `background-light.jpg`
- `background-dark.jpg`
- `background-light.mp4`
- `background-dark.mp4`

## Credits

- UI building blocks from `shadcn/ui` components used in the project
- Brand assets, imagery, and portfolio content belong to Mohamad Faris Danial
