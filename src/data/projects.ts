import type { Project } from "./types";
import assetflow from "../assets/projects/assetflow.png";
import melodia from "../assets/projects/melodia.webp";
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
      "An offline Windows app for tracking lab equipment, with inventory, weekly inspections, work orders and Excel/PDF reports on a local PostgreSQL engine.",
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
      "An open-source, offline music player for your own library on Windows and Android, with gapless playback, on-device mixes and QR library transfer.",
    tags: ["Electron", "Next.js", "Android", "SQLite", "GPLv3"],
    media: { kind: "image", src: melodia, alt: "Melodia home screen showing personal mixes and recently played songs" },
    href: "https://github.com/penyululz/Melodia",
    aiAssisted: true,
  },
  {
    id: "fmp",
    title: "Facility Management Partner",
    type: "Multi-tenant SaaS",
    group: "featured",
    summary:
      "A multi-tenant platform for facility teams to handle bookings, maintenance, billing and daily operations. I designed and built it full-stack on Supabase.",
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
      "My web studio's site, presenting practical websites and business systems, including the TicketPro ticketing product.",
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
      "A coaching and account management system for daily operations. I led the project and built across the UI and backend.",
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
