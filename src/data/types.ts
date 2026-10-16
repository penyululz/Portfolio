import type { ImageMetadata } from "astro";

/** Month is 1–12; omit it for year-only precision. */
export type YearMonth = { year: number; month?: number };
export type Period = { start: YearMonth; end: YearMonth | "present" };

export type RoleKind = "teaching" | "it" | "dev";
export interface Role {
  id: string;
  title: string;
  org: string;
  period: Period;
  kind: RoleKind;
  highlights: string[];
}

export type ProjectMedia =
  | { kind: "image"; src: ImageMetadata; alt: string }
  | { kind: "icon"; icon: "music" };

export interface Project {
  id: string;
  title: string;
  type: string;
  group: "featured" | "self-hosted";
  summary: string;
  tags: string[];
  media: ProjectMedia;
  href?: string;
  aiAssisted: boolean;
}

export type DayDate = { year: number; month: number; day: number };
export interface Credential {
  id: string;
  title: string;
  issuer?: string;
  date?: DayDate;
  dateEnd?: DayDate;
  kind: "course" | "badge" | "accreditation";
  badge?: { src: ImageMetadata; alt: string };
  credentialId?: string;
  note?: string;
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  status: string;
  current: boolean;
}

export type SkillIcon = "presentation" | "wrench" | "server" | "code";
export interface SkillCard {
  title: string;
  icon: SkillIcon;
  summary: string;
}

export interface Profile {
  fullName: string;
  displayName: string;
  shortName: string;
  eyebrow: string;
  tagline: string;
  about: [string, string];
  philosophy: string;
  email: string;
  phone: string;
  location: string;
  links: { linkedin: string; github: string; website: string };
  resume: { href: "/resume.pdf"; downloadName: "Mohamad-Faris-Danial-Resume-2026.pdf" };
}
