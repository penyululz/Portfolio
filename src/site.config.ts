export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

export const SITE = {
  url: "https://farisdanial.space",
  title: "Mohamad Faris Danial | Lecturer & Technical Builder",
  description:
    "Lecturer and technical builder in Malaysia. Teaching backed by hands-on IT support, server and network operations, Docker deployment and full-stack web development.",
  themeColor: { light: "#ffffff", dark: "#050505" },
} as const;
