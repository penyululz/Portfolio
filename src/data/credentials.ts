import type { Credential } from "./types";
import innovatorBadge from "../assets/badges/wayground-pd-innovator.png";
import gameChangerBadge from "../assets/badges/wayground-game-changer.png";

const AIHQ = "AIHQ Training and Consultancy";

export const credentials: Credential[] = [
  {
    id: "wayground-innovator",
    title: "Professional Development Innovator",
    issuer: "Wayground",
    date: { year: 2026, month: 8, day: 18 },
    kind: "badge",
    badge: { src: innovatorBadge, alt: "Wayground Professional Development Innovator badge" },
    note: "30 PD minutes",
  },
  {
    id: "wayground-game-changer",
    title: "Certified Game Changer",
    issuer: "Wayground",
    date: { year: 2026, month: 8, day: 18 },
    kind: "badge",
    badge: { src: gameChangerBadge, alt: "Wayground Certified Game Changer badge" },
  },
  {
    id: "aihq-content",
    title: "AI Content Creation for Work: Produce Posters and Videos Faster",
    issuer: AIHQ,
    date: { year: 2026, month: 7, day: 24 },
    kind: "course",
  },
  {
    id: "aihq-vibe",
    title: "AI Vibe Coding for Work: Make Everyday Tasks Easier",
    issuer: AIHQ,
    date: { year: 2026, month: 7, day: 24 },
    kind: "course",
  },
  {
    id: "utm-nlp",
    title: "Introduction to Natural Language Processing (NLP): How Machines Understand Human Language",
    issuer: "Universiti Teknikal MARA Sdn. Bhd.",
    date: { year: 2026, month: 7, day: 24 },
    kind: "course",
  },
  {
    id: "aihq-storytelling",
    title: "Digital Storytelling in the AI Era for Educators",
    issuer: AIHQ,
    date: { year: 2026, month: 7, day: 23 },
    kind: "course",
  },
  {
    id: "aihq-agents",
    title: "AI Agents for Work: How AI Is Changing the Way Teams Operate",
    issuer: AIHQ,
    date: { year: 2026, month: 7, day: 22 },
    kind: "course",
  },
  {
    id: "web-html-css",
    title: "Build Modern Websites from Scratch with HTML & CSS",
    date: { year: 2026, month: 7, day: 20 },
    kind: "course",
    credentialId: "RS-6A5EE66167AA2",
  },
  {
    id: "jpk-induction",
    title: "Kursus Induksi Personel Pentauliahan PP-PPD-PPB",
    issuer: "Jabatan Pembangunan Kemahiran (organised by Budiman Dinamik Sdn Bhd)",
    date: { year: 2026, month: 7, day: 11 },
    dateEnd: { year: 2026, month: 7, day: 12 },
    kind: "accreditation",
  },
  {
    id: "integrity",
    title: "Cultivating Integrity in the Workplace",
    kind: "course",
  },
];

export const teachingCredentialIds = [
  "wayground-innovator",
  "wayground-game-changer",
  "jpk-induction",
  "aihq-storytelling",
];
