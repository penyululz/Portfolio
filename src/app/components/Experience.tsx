import { motion, useScroll } from "motion/react";
import { useRef } from "react";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end end"],
  });

  const experiences = [
    {
      period: "2025 - Present",
      role: "Independent Technical Builder",
      company: "Personal Projects & Academic Studies",
      description:
        "Currently completing a part-time Computer Science degree at MSU while building and deploying personal web applications. This phase is focused on strengthening practical development, debugging, and system delivery skills.",
    },
    {
      period: "June 2025 - Previously Active",
      role: "Lead Assistant Technical Specialist",
      company: "Microbumi Systems and Services (Texas Instruments)",
      description:
        "Supported live technical environments by maintaining server-related systems, handling network patching, device deployment, and first-line troubleshooting. Worked in a real operational setting where stability, reporting, and fast issue response mattered.",
    },
    {
      period: "Oct 2024 - Dec 2024",
      role: "DevOps Engineer (Internship / Freelance)",
      company: "SatuSky",
      description:
        "Helped test and maintain web applications, then assisted with deployment work in Docker and Linux environments. Gained hands-on exposure to environment setup, runtime issues, and basic system optimization.",
    },
    {
      period: "2023 - 2024",
      role: "Technical Customer Service",
      company: "ALL IT Hypermarket",
      description:
        "Provided technical support for customers, diagnosed hardware and software issues, and handled installations, testing, and warranty cases. Strengthened communication and problem solving in a fast retail support environment.",
    },
    {
      period: "May 2023 - Dec 2023",
      role: "Project Lead Developer (Project-Based)",
      company: "TikTok",
      description:
        "Worked on a project-based coaching platform, helping coordinate frontend and backend implementation and keeping the system practical for users. This role gave me hands-on experience turning requirements into a working web application.",
    },
    {
      period: "2022 - 2023",
      role: "Computer Technician",
      company: "Eden Hafiz Group",
      description:
        "Handled computer repair, servicing, and warranty-related troubleshooting. Learned to diagnose issues quickly, explain solutions clearly, and keep systems usable for customers.",
    },
    {
      period: "2021 - 2022",
      role: "Computer Technician",
      company: "Kak Mira Komputer",
      description:
        "Diagnosed everyday hardware and software problems, carried out OS installations, and supported customers with practical fixes. This role built the foundation for my troubleshooting and hands-on IT work.",
    },
  ];

  return (
    <section id="experience" className="section-render relative bg-transparent py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="section-heading-block">
          <div className="section-heading-stack">
            <h2 className="display-title text-3xl font-black leading-[0.98] tracking-[-0.03em] text-zinc-950 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            WORK <span className="text-emerald-500">EXPERIENCE</span>
            </h2>
          </div>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Central Animated Line */}
          <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-zinc-200 lg:left-1/2 lg:-translate-x-1/2 dark:bg-zinc-800" />
          <motion.div
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="absolute left-[14px] top-0 bottom-0 z-10 w-[2px] bg-emerald-500 lg:left-1/2 lg:-translate-x-1/2"
          />

          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`relative flex flex-col items-start gap-6 sm:gap-8 lg:flex-row lg:gap-0 ${isEven ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[8px] mt-2 h-3.5 w-3.5 rounded-full border-2 border-emerald-500 bg-white shadow-[0_0_15px_rgba(16,185,129,0.35)] lg:left-1/2 lg:h-4 lg:w-4 lg:-translate-x-1/2 dark:bg-black dark:shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

                  {/* Empty space for the other side */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Content Card */}
                  <div className={`w-full pl-10 sm:pl-12 lg:w-1/2 lg:pl-0 ${isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <div className="group relative">
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full bg-emerald-500/10">
                        {exp.period}
                      </span>

                      <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-2xl lg:text-3xl">{exp.role}</h3>

                      <h4 className="mb-4 text-base font-medium text-zinc-700 dark:text-zinc-400 sm:mb-5 sm:text-lg lg:mb-6">{exp.company}</h4>

                      <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-500 sm:text-lg">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
