import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileEdit, Mail, MonitorPlay } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Facility Management Partner",
    type: "SaaS Platform",
    description:
      "A multi-tenant application streamlining facility operations. Coordinates maintenance, vendors, and complex bookings workflows.",
    tags: ["React", "Supabase", "PostgreSQL", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1744735913931-dab4bbde360a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWFzJTIwZGFzaGJvYXJkJTIwdWl8ZW58MXx8fHwxNzc0NTk2MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    link: "https://fmp-experimental-fp.vercel.app",
  },
  {
    title: "TikTok System",
    type: "Web Application",
    description:
      "Led development of a web-based coaching system, architecting the platform and coordinating end-to-end team delivery.",
    tags: ["Architecture", "Team Lead", "Delivery"],
    icon: MonitorPlay,
  },
  {
    title: "Go Mail",
    type: "Backend Service",
    description:
      "Robust email system built entirely in Go featuring secure authentication with comprehensive SMTP and IMAP capabilities.",
    tags: ["Go", "SMTP/IMAP", "Auth"],
    icon: Mail,
  },
  {
    title: "Immich & Stirling PDF",
    type: "Open Source",
    description:
      "Contributed to high-performance systems including a Docker-optimized photo manager and a comprehensive PDF manipulation tool.",
    tags: ["Docker", "Optimization", "System Dev"],
    icon: FileEdit,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 48 : -48,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -48 : 48,
  }),
};

function ProjectSlide({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="group relative h-[26rem] overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_18px_44px_rgba(24,24,27,0.08)] sm:h-[30rem] sm:rounded-[2rem] md:h-[34rem] xl:h-[36rem] dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-none">
      {project.image ? (
        <>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/45 to-transparent dark:from-black dark:via-black/55 dark:to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] dark:opacity-5">
          <project.icon className="h-32 w-32 text-zinc-900 dark:text-white md:h-44 md:w-44" />
        </div>
      )}

      <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-7 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-zinc-200 bg-white/90 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-zinc-700 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.24em] dark:border-zinc-700 dark:bg-zinc-950/75 dark:text-zinc-300">
            {project.type}
          </span>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-black transition-transform hover:scale-110 sm:h-12 sm:w-12"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white sm:mb-4 sm:text-3xl md:text-4xl xl:text-5xl">{project.title}</h3>
          <p className="mb-5 max-w-2xl text-sm font-light leading-relaxed text-zinc-800 dark:text-zinc-300 sm:mb-7 sm:text-base md:mb-8 md:text-lg xl:text-xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 sm:px-4 sm:py-2 sm:text-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  const activeProject = projects[activeIndex];

  return (
    <section id="project-fmp" className="section-render bg-white py-20 dark:bg-[#050505] sm:py-24 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:gap-10 xl:grid-cols-[minmax(0,21rem)_1fr] xl:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-sm"
          >
            <h2 className="mb-5 text-4xl font-black leading-[0.9] tracking-[-0.06em] text-zinc-950 dark:text-white sm:text-5xl md:text-6xl xl:text-[4.2vw]">
              SELECTED
              <br />
              <span className="text-zinc-500 dark:text-zinc-500">WORKS</span>
            </h2>
            <p className="text-base text-zinc-700 dark:text-zinc-400 sm:text-lg md:text-xl">
              From robust full-stack SaaS platforms to high-performance microservices and open-source contributions.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4 md:mt-10">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:text-emerald-400"
                aria-label="Previous project"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-black transition-transform hover:scale-105"
                aria-label="Next project"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              <div className="text-sm font-mono uppercase tracking-[0.24em] text-zinc-600 dark:text-zinc-500">
                {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`rounded-full border px-3 py-2 text-xs transition-colors sm:px-4 sm:text-sm ${
                    index === activeIndex
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          >
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProject.title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: "easeOut" }}
                  className="transform-gpu"
                >
                  <ProjectSlide project={activeProject} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
