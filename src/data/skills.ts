import type { SkillCard } from "./types";

export const marqueeRows: [string[], string[]] = [
  ["PC Troubleshooting", "Hardware Repair", "Networking", "Technical Support", "Teaching", "React", "TypeScript"],
  ["Astro", "Next.js", "Electron", "Tailwind CSS", "Supabase", "PostgreSQL", "Docker", "Linux"],
];

export const skillCards: SkillCard[] = [
  {
    title: "Teaching & Training",
    icon: "presentation",
    summary:
      "Structured lectures and tutorials, assessment design, and mentoring students from fundamentals to working projects.",
  },
  {
    title: "Hardware & IT Support",
    icon: "wrench",
    summary:
      "PC troubleshooting, hardware repair, OS installation, networking and day-to-day support in real user environments.",
  },
  {
    title: "Deployment & Systems",
    icon: "server",
    summary:
      "Docker, Linux environments, server and network maintenance, cybersecurity protocols, and Vercel deployment.",
  },
  {
    title: "Software Development",
    icon: "code",
    summary:
      "React, Next.js, Electron, Astro, Tailwind CSS and PostgreSQL/Supabase, with AI-assisted workflows that I review, test and debug before shipping.",
  },
];
