import type { Role } from "./types";

export const LECTURER_HIGHLIGHTS = [
  "Prepared and delivered structured lectures and tutorials with clear learning outcomes.",
  "Designed and evaluated assignments, projects, and examinations to measure performance.",
  "Provided academic guidance and mentorship to support student success.",
  "Collaborated with colleagues to enhance teaching materials and improve delivery methods.",
  "Contributed to departmental initiatives and academic events.",
];

export const roles: Role[] = [
  {
    id: "ttc-ft",
    title: "Full-Time Lecturer",
    org: "Tech Terrain College",
    period: { start: { year: 2026, month: 7 }, end: "present" },
    kind: "teaching",
    highlights: LECTURER_HIGHLIGHTS,
  },
  {
    id: "microbumi",
    title: "Technical Specialist",
    org: "Microbumi Systems and Services (Texas Instruments, Melaka)",
    period: { start: { year: 2025, month: 6 }, end: { year: 2025, month: 10 } },
    kind: "it",
    highlights: [
      "Managed IT systems and improved user experience in production environments",
      "Maintained server systems and physical infrastructure (OEE systems)",
      "Implemented cybersecurity protocols and network configurations",
      "Provided troubleshooting and remote technical support",
    ],
  },
  {
    id: "satusky",
    title: "DevOps / Web Support",
    org: "SatuSky",
    period: { start: { year: 2024, month: 10 }, end: { year: 2024, month: 12 } },
    kind: "dev",
    highlights: [
      "Worked with Docker-based and Linux environments, helped with deployment tasks, and supported web system setup.",
      "Investigated runtime issues and contributed to system reliability.",
    ],
  },
  {
    id: "ttc-pt",
    title: "Part-Time Lecturer",
    org: "Tech Terrain College",
    period: { start: { year: 2024, month: 1 }, end: { year: 2025, month: 12 } },
    kind: "teaching",
    highlights: LECTURER_HIGHLIGHTS,
  },
  {
    id: "tiktok",
    title: "Project-Based Web Developer",
    org: "TikTok System Project",
    period: { start: { year: 2023, month: 5 }, end: { year: 2023, month: 12 } },
    kind: "dev",
    highlights: [
      "Built a web-based coaching and account management system for operational use.",
      "Focused on UI structure, backend connection, and shipping a working version for daily workflow use.",
    ],
  },
  {
    id: "allit",
    title: "Technical Customer Service",
    org: "ALL IT Hypermarket",
    period: { start: { year: 2023, month: 1 }, end: { year: 2024, month: 9 } },
    kind: "it",
    highlights: [
      "Provided technical support for customers, handled troubleshooting, installations, testing, and warranty cases.",
      "Gained hands-on experience solving real hardware and software issues.",
    ],
  },
  {
    id: "eden",
    title: "Computer Technician",
    org: "Eden Hafiz Group",
    period: { start: { year: 2022 }, end: { year: 2023 } },
    kind: "it",
    highlights: [
      "Diagnosed PC and software issues, performed repairs, and handled routine system maintenance.",
      "Supported users with setup, troubleshooting, and practical fixes.",
    ],
  },
  {
    id: "kakmira",
    title: "Computer Technician",
    org: "Kak Mira Komputer",
    period: { start: { year: 2021 }, end: { year: 2022 } },
    kind: "it",
    highlights: [
      "Handled basic repairs, installations, and walk-in troubleshooting requests.",
      "Built early hands-on experience in hardware support and customer-facing technical work.",
    ],
  },
];
