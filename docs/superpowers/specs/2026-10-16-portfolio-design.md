# Portfolio 2026 — Design Spec

Date: 2026-10-16 · Owner: Mohamad Faris Danial

## 1. Goal

A fresh, static, single-page portfolio presenting Faris as **Lecturer & Technical Builder**:
teaching leads; five years of hands-on IT, deployment and web-app work is the proof behind it.
It replaces `E:\Portfolio-master\Portfolio-master` (React/Vite) and keeps that site's visual language.

## 2. Decisions (confirmed with owner, 2026-10-16)

| Topic | Decision |
|---|---|
| Positioning | Lecturer + Builder. |
| Codebase | Fresh rebuild in Astro (static output), at `E:\Portfolio-master\portfolio-2026`. |
| Self-hosted projects | Show Immich, Stirling PDF, Gomail as a "Self-hosted" group. |
| MSU degree | Ongoing: "2025 – Present, part-time". |
| AI-assisted disclosure | Every project is AI-assisted and says so: each project slide and card shows an `AI-assisted` pill, and the Projects intro states it (§4.3). |
| Source of truth on conflicts | `E:\cert and resume\Mohamad Faris Danial Resume 2026.pdf` wins over the old site and `personal-profile.md`. |
| Privacy | DKM, SKM and the JPK induction certificate PDFs print the owner's national IC number. **No certificate PDF is ever copied into the repo or deployed.** Certificates are shown as data cards; only the two Wayground badge PNGs are shipped as images. |

## 3. Sections (in page order)

| # | id | Heading (lead / accent) | Content |
|---|---|---|---|
| 1 | `home` | FARIS / DANIAL | Hero: eyebrow, two-tone name, tagline, CTAs "View Projects" (→ `#projects`) and "Download Resume", pill portrait, theme video background. |
| 2 | `about` | ABOUT / ME | Story paragraphs, "Education Path" (MSU), "Core Philosophy". |
| 3 | `teaching` | TEACHING / & TRAINING | Lecturer roles at Tech Terrain College with resume highlights; PD credential chips. |
| 4 | `projects` | SELECTED / PROJECTS | Featured carousel (5) + Self-hosted grid (3). |
| 5 | `skills` | CORE / SKILLS | Two marquee rows + four competency cards. |
| 6 | `experience` | WORK / EXPERIENCE | Alternating timeline with scroll-progress line, all 8 roles. |
| 7 | `credentials` | CERTIFICATIONS / & EDUCATION | Education list + credential cards (badges shown as images). |
| 8 | `contact` | CONTACT / ME | Email/phone, LinkedIn, GitHub cards. |
| — | — | — | Footer; floating Accessibility tools widget. |

Navbar items (no "Home"; the logo links to `#home`): About, Teaching, Projects, Skills, Experience, Credentials, Contact.

## 4. Content inventory (exact values)

### 4.1 Profile
- Full name: Mohamad Faris Danial Abdul Malek · Display: Mohamad Faris Danial · Short: Faris Danial
- Eyebrow: `Lecturer | Technical Builder | IT Systems & Deployment`
- Tagline: `Lecturer at Tech Terrain College and technical builder. I teach from five years of hands-on work across hardware repair, IT support, server and network operations, Docker deployments and full-stack web apps. Currently pursuing a part-time Computer Science degree at MSU.`
- Email `farismalekofficial@gmail.com` · Phone `+60 13 5858 199` · Location `Malaysia`
- LinkedIn `https://www.linkedin.com/in/mohamad-faris-danial-abdul-malek-497246294` · GitHub `https://github.com/penyululz` · Website `https://www.webforge.my`
- Resume: `/resume.pdf`, download name `Mohamad-Faris-Danial-Resume-2026.pdf` (fixes old "Reusme" typo)
- `<title>`: `Mohamad Faris Danial | Lecturer & Technical Builder`
- Meta description: `Lecturer and technical builder in Malaysia. Teaching backed by hands-on IT support, server and network operations, Docker deployment and full-stack web development.`
- About paragraph 1: `I started with hardware repair and IT support, learning to diagnose problems, keep systems running and explain fixes clearly to the people using them.`
- About paragraph 2: `That work led me into deployment and web development, and now into teaching. I use AI tools to move faster, but I review, test and debug everything myself, and I teach students to do the same.`
- Core philosophy: `Build real systems that work in practice. Clear structure, reliable behaviour and steady iteration matter more than a complicated stack.`

### 4.2 Experience (newest start first)
| id | Title | Org | Period | kind |
|---|---|---|---|---|
| ttc-ft | Full-Time Lecturer | Tech Terrain College | Jul 2026 – Present | teaching |
| microbumi | Technical Specialist | Microbumi Systems and Services (Texas Instruments, Melaka) | Jun 2025 – Oct 2025 | it |
| satusky | DevOps / Web Support | SatuSky | Oct 2024 – Dec 2024 | dev |
| ttc-pt | Part-Time Lecturer | Tech Terrain College | Jan 2024 – Dec 2025 | teaching |
| tiktok | Project-Based Web Developer | TikTok System Project | May 2023 – Dec 2023 | dev |
| allit | Technical Customer Service | ALL IT Hypermarket | Jan 2023 – Sep 2024 | it |
| eden | Computer Technician | Eden Hafiz Group | 2022 – 2023 | it |
| kakmira | Computer Technician | Kak Mira Komputer | 2021 – 2022 | it |

Highlights per role: the resume 2026 bullets verbatim. The lecturer roles share the five lecturer bullets. Microbumi uses its four resume bullets.

### 4.3 Projects
Section intro: `Desktop apps, web platforms and self-hosted systems I have designed, built and deployed. Every project here is AI-assisted: I direct the work with AI coding tools, then review, test and debug the result myself.`
Every project (featured and self-hosted) carries `aiAssisted: true` and shows an `AI-assisted` pill (Lucide `Sparkles` icon) beside its type pill.

Featured (carousel order). `media` is a screenshot unless marked *icon*, in which case a large Lucide icon is centred on an emerald/zinc gradient panel.

1. **AssetFlow** · `Windows Desktop App · 2026` · "An offline Windows program for tracking lab equipment: inventory, weekly inspections, issues and work orders, and Excel/PDF reports. A local engine runs Next.js and PostgreSQL 17 on 127.0.0.1 only, with append-only ledgers, history as of any past date, and verified backups. Covered by 420+ unit and server tests and 100+ browser tests with axe." · tags Electron, Next.js, PostgreSQL, Drizzle ORM, Playwright · no public link · media: screenshot `E:\dev\labreport-v3\docs\screenshots\after\dark-1366-01-home.png` (fixture data only)
2. **Melodia** · `Music Player · Windows & Android` · "An open-source, local-first music player for your own audio library. It plays offline with gapless playback, crossfade and replay gain, keeps playlists and recommendations on the device, and moves libraries between Windows and Android by QR transfer with SHA-256 verification. No account, no cloud." · tags Electron, Next.js, Android, SQLite, GPLv3 · `https://github.com/penyululz/Melodia` · media: *icon* `music` (the repo has no screenshot and its `public/icon.svg` is a template placeholder)
3. **Facility Management Partner** · `Multi-tenant SaaS` · "A multi-tenant platform for facility teams to manage bookings, maintenance requests, billing and daily operations in one place. I designed the architecture and app flow, built it full-stack on Supabase, and ran A/B tests to improve the UX." · tags React, TypeScript, Supabase, PostgreSQL, Vercel · `https://fmp-experimental-fp.vercel.app`
4. **WebForge** · `Business Website` · "My web studio's public site, presenting practical websites and web systems for day-to-day business operations, including the TicketPro ticketing product." · tags Astro, Tailwind CSS, Deployment, TicketPro · `https://www.webforge.my`
5. **TikTok System** · `Coaching Platform · 2023` · "A web-based coaching and account management system built for operational use. I led the project and worked across UI structure and backend connection, shipping a working version for daily workflows." · tags React, Frontend, Backend, Project Lead · no link

Self-hosted (grid; descriptions are draft copy for the owner to correct):
6. **Immich** · `Self-hosted · Photo backup` · "Self-hosted photo and video backup running in Docker on Linux, replacing a cloud subscription with a server I maintain." · tags Docker, Linux, Self-hosting
7. **Stirling PDF** · `Self-hosted · PDF toolkit` · "A self-hosted PDF toolkit (merge, split, convert, OCR) deployed with Docker so documents never leave my own server." · tags Docker, Linux, Self-hosting
8. **Gomail** · `Self-hosted · Mail service` · "A Go-based mail-sending service deployed and configured on my own infrastructure for transactional email." · tags Go, Docker, SMTP

### 4.4 Skills
Marquee row 1: PC Troubleshooting, Hardware Repair, Networking, Technical Support, Teaching, React, TypeScript
Marquee row 2: Astro, Next.js, Electron, Tailwind CSS, Supabase, PostgreSQL, Docker, Linux
Cards:
- **Teaching & Training** (icon `presentation`): "Structured lectures and tutorials, assessment design, and mentoring students from fundamentals to working projects."
- **Hardware & IT Support** (icon `wrench`): "PC troubleshooting, hardware repair, OS installation, networking and day-to-day support in real user environments."
- **Deployment & Systems** (icon `server`): "Docker, Linux environments, server and network maintenance, cybersecurity protocols, and Vercel deployment."
- **Software Development** (icon `code`): "React, Next.js, Electron, Astro, Tailwind CSS and PostgreSQL/Supabase, with AI-assisted workflows that I review, test and debug before shipping."

### 4.5 Education
| id | Title | Institution | Status |
|---|---|---|---|
| msu | Bachelor in Computer Science | Management & Science University (MSU) | 2025 – Present · Part-time, weekend classes |
| dkm | Diploma Kemahiran Malaysia (DKM) Level 4 — Computer Systems Administration | Department of Skills Development (JPK), assessed at YP Advanced Skills, Pahang | Completed |
| skm | Sijil Kemahiran Malaysia (SKM) Level 3 — Computer System Operation | Department of Skills Development (JPK), assessed at Kolej Yayasan Pahang Advanced Skills | Completed |
| spm | Sijil Pelajaran Malaysia (SPM) | Malaysian Examinations Syndicate | Completed |

### 4.6 Credentials
| id | Title | Issuer | Date | kind |
|---|---|---|---|---|
| wayground-innovator | Professional Development Innovator | Wayground | 18 Aug 2026 | badge (image) — note "30 PD minutes" |
| wayground-game-changer | Certified Game Changer | Wayground | 18 Aug 2026 | badge (image) |
| aihq-content | AI Content Creation for Work: Produce Posters and Videos Faster | AIHQ Training and Consultancy | 24 Jul 2026 | course |
| aihq-vibe | AI Vibe Coding for Work: Make Everyday Tasks Easier | AIHQ Training and Consultancy | 24 Jul 2026 | course |
| utm-nlp | Introduction to Natural Language Processing (NLP): How Machines Understand Human Language | Universiti Teknikal MARA Sdn. Bhd. | 24 Jul 2026 | course |
| aihq-storytelling | Digital Storytelling in the AI Era for Educators | AIHQ Training and Consultancy | 23 Jul 2026 | course |
| aihq-agents | AI Agents for Work: How AI Is Changing the Way Teams Operate | AIHQ Training and Consultancy | 22 Jul 2026 | course |
| web-html-css | Build Modern Websites from Scratch with HTML & CSS | — (issuer not printed) | 20 Jul 2026 | course — credentialId `RS-6A5EE66167AA2` |
| jpk-induction | Kursus Induksi Personel Pentauliahan PP-PPD-PPB | Jabatan Pembangunan Kemahiran (organised by Budiman Dinamik Sdn Bhd) | 11–12 Jul 2026 | accreditation |
| integrity | Cultivating Integrity in the Workplace | — | — | course |

Teaching section chips: `wayground-innovator`, `wayground-game-changer`, `jpk-induction`, `aihq-storytelling`.

## 5. Design language (carried from the old site)

- **Palette:** zinc neutrals + emerald accent. Page bg light `#ffffff`, dark `#050505`. Accent `#10b981` (emerald-500), `#34d399` (emerald-400, dark-mode text accent), `#059669`/`#047857` (emerald-600/700, accent text on light bg for contrast). Borders zinc-200 / zinc-800. `theme-color` meta tracks the theme.
- **Type:** system sans stack. Display headings: weight 900, uppercase, letter-spacing −0.035em to −0.045em, line-height 0.86–0.98, two-tone (lead in zinc-950/white, accent in emerald), soft text-shadow. Eyebrows: monospace, uppercase, tracking 0.22em, emerald, preceded by a 2px × 48px emerald rule in the hero.
- **Shapes:** pill buttons and nav (`rounded-full`), cards at 1.5–2rem radius, 1px borders, soft long shadows in light mode, none in dark; frosted panels (`backdrop-blur`, white/82 or black/58).
- **Signature elements:** pill-shaped grayscale portrait that goes to colour on hover with an emerald overlay; theme-specific looping hero video over gradient scrims; theme-specific textured page background; −2° rotated double marquee of skills with emerald dots; centre-line timeline with emerald scroll-progress fill and glowing nodes; carousel with round prev/next buttons, `01 / 03` counter and title chips; floating accessibility widget (text 90–130 % in 10 % steps, underline links, readable font, reset).
- **Motion:** fade/slide-up reveal on scroll, spring-like hero stagger; all motion off under `prefers-reduced-motion: reduce`. Content is fully visible without JavaScript.

## 6. Non-functional requirements

- Static output, deployable to Vercel. Site URL `https://farisdanial.space` (from the old `vite.config.ts` allowedHosts; single constant).
- Light/dark: stored choice, else system preference; applied before first paint.
- No horizontal scroll at 360px width.
- WCAG 2.1 AA: axe-core reports zero serious/critical violations in both themes.
- Budgets: built `dist/` ≤ 15 MB total, no single file > 6 MB.
- Privacy: no string matching a Malaysian IC pattern (`\b\d{6}-?\d{2}-?\d{4}\b`) in source or `dist/`; the only PDF in `dist/` is `resume.pdf`.
- SEO: title/description/OG/Twitter tags, `Person` JSON-LD, sitemap, robots, manifest, favicons.
