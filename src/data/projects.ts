import type { Project } from "./types";
import assetflow from "../assets/projects/assetflow.png";
import fmp from "../assets/projects/fmp.png";
import webforge from "../assets/projects/webforge.png";
import tiktok from "../assets/projects/tiktok.webp";
import immich from "../assets/projects/immich.png";
import stirlingPdf from "../assets/projects/stirling-pdf.jpg";
import gomail from "../assets/projects/gomail.png";

export const projectsIntro =
  "Desktop apps, web platforms and self-hosted systems I have designed, built and deployed. Every project here is AI-assisted: I direct the work with AI coding tools, then review, test and debug the result myself.";

export const projects: Project[] = [
  {
    id: "assetflow",
    title: "AssetFlow",
    type: "Windows Desktop App · 2026",
    group: "featured",
    summary:
      "An offline Windows program for tracking lab equipment: inventory, weekly inspections, issues and work orders, and Excel/PDF reports. A local engine runs Next.js and PostgreSQL 17 on 127.0.0.1 only, with append-only ledgers, history as of any past date, and verified backups. Covered by 420+ unit and server tests and 100+ browser tests with axe.",
    tags: ["Electron", "Next.js", "PostgreSQL", "Drizzle ORM", "Playwright"],
    media: { kind: "image", src: assetflow, alt: "AssetFlow home screen showing weekly inspections and recent activity" },
    aiAssisted: true,
  },
  {
    id: "melodia",
    title: "Melodia",
    type: "Music Player · Windows & Android",
    group: "featured",
    summary:
      "An open-source, local-first music player for your own audio library. It plays offline with gapless playback, crossfade and replay gain, keeps playlists and recommendations on the device, and moves libraries between Windows and Android by QR transfer with SHA-256 verification. No account, no cloud.",
    tags: ["Electron", "Next.js", "Android", "SQLite", "GPLv3"],
    media: { kind: "icon", icon: "music" },
    href: "https://github.com/penyululz/Melodia",
    aiAssisted: true,
  },
  {
    id: "fmp",
    title: "Facility Management Partner",
    type: "Multi-tenant SaaS",
    group: "featured",
    summary:
      "A multi-tenant platform for facility teams to manage bookings, maintenance requests, billing and daily operations in one place. I designed the architecture and app flow, built it full-stack on Supabase, and ran A/B tests to improve the UX.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    media: { kind: "image", src: fmp, alt: "Facility Management Partner dashboard preview" },
    href: "https://fmp-experimental-fp.vercel.app",
    aiAssisted: true,
  },
  {
    id: "webforge",
    title: "WebForge",
    type: "Business Website",
    group: "featured",
    summary:
      "My web studio's public site, presenting practical websites and web systems for day-to-day business operations, including the TicketPro ticketing product.",
    tags: ["Astro", "Tailwind CSS", "Deployment", "TicketPro"],
    media: { kind: "image", src: webforge, alt: "WebForge website preview" },
    href: "https://www.webforge.my",
    aiAssisted: true,
  },
  {
    id: "tiktok",
    title: "TikTok System",
    type: "Coaching Platform · 2023",
    group: "featured",
    summary:
      "A web-based coaching and account management system built for operational use. I led the project and worked across UI structure and backend connection, shipping a working version for daily workflows.",
    tags: ["React", "Frontend", "Backend", "Project Lead"],
    media: { kind: "image", src: tiktok, alt: "TikTok System project preview" },
    aiAssisted: true,
  },
  {
    id: "immich",
    title: "Immich",
    type: "Self-hosted · Photo backup",
    group: "self-hosted",
    summary:
      "Self-hosted photo and video backup running in Docker on Linux, replacing a cloud subscription with a server I maintain.",
    tags: ["Docker", "Linux", "Self-hosting"],
    media: { kind: "image", src: immich, alt: "Immich logo" },
    aiAssisted: true,
  },
  {
    id: "stirling-pdf",
    title: "Stirling PDF",
    type: "Self-hosted · PDF toolkit",
    group: "self-hosted",
    summary:
      "A self-hosted PDF toolkit (merge, split, convert, OCR) deployed with Docker so documents never leave my own server.",
    tags: ["Docker", "Linux", "Self-hosting"],
    media: { kind: "image", src: stirlingPdf, alt: "Stirling PDF logo" },
    aiAssisted: true,
  },
  {
    id: "gomail",
    title: "Gomail",
    type: "Self-hosted · Mail service",
    group: "self-hosted",
    summary:
      "A Go-based mail-sending service deployed and configured on my own infrastructure for transactional email.",
    tags: ["Go", "Docker", "SMTP"],
    media: { kind: "image", src: gomail, alt: "Go gopher launching a rocket full of envelopes" },
    aiAssisted: true,
  },
];
