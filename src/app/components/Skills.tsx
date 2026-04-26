import { motion } from "motion/react";
import { Code2, Database, Network, Users } from "lucide-react";

const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: string[], reverse?: boolean, speed?: number }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap mask-image-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`marquee-track flex w-max items-center gap-12 px-6 py-4 ${reverse ? "animate-marquee-right" : "animate-marquee-left"} motion-reduce:animate-none`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="bg-clip-text text-4xl font-black uppercase tracking-tighter text-transparent transition-colors duration-300 hover:text-emerald-500 bg-zinc-600 dark:bg-zinc-800 md:text-6xl">
              {item}
            </span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export function Skills() {
  const row1 = ["PC Troubleshooting", "Hardware Repair", "OS Installation", "Technical Support", "React", "TypeScript"];
  const row2 = ["Tailwind CSS", "Supabase", "PostgreSQL", "Docker", "Linux", "Vercel Deployment"];

  const softSkills = [
    { title: "Hardware & IT Support", icon: Users, desc: "PC troubleshooting, hardware repair, OS installation, and day-to-day technical support in real user environments." },
    { title: "Deployment & Systems", icon: Network, desc: "Basic Docker usage and modification, Linux environments, Vercel deployment, and environment configuration." },
    { title: "Software Development", icon: Database, desc: "React, TypeScript, Tailwind CSS, Supabase/PostgreSQL, and dashboard-focused web application development." },
    { title: "AI-Assisted Development", icon: Code2, desc: "Use AI-assisted coding workflows for speed, then review, test, debug, and adjust the code before shipping." },
  ];

  return (
    <section id="skills" className="section-render relative overflow-hidden bg-transparent py-20 sm:py-24 lg:py-32">
      
      {/* Infinite Scrolling Ticker */}
      <div className="mb-14 flex flex-col gap-3 rotate-[-2deg] sm:mb-18 sm:gap-4 sm:scale-105 lg:mb-24">
        <MarqueeRow items={row1} speed={35} />
        <MarqueeRow items={row2} reverse speed={45} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="section-heading-block">
            <div className="section-heading-stack">
              <h2 className="display-title text-3xl font-black leading-[0.98] tracking-[-0.03em] text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
              CORE <span className="text-emerald-500 dark:text-emerald-400">SKILLS</span>
              </h2>
              <p className="section-heading-copy text-base text-zinc-700 dark:text-zinc-400 sm:text-lg">
              Skills grouped around hands-on support, software development, deployment work, and AI-assisted coding workflows.
              </p>
            </div>
          </div>

        {/* Bento Grid for Core Competencies */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {softSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-[1.5rem] border border-zinc-200 bg-white p-5 shadow-[0_14px_36px_rgba(24,24,27,0.07)] transition-colors hover:bg-zinc-50 sm:rounded-3xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40 dark:shadow-none dark:hover:bg-zinc-800/50"
            >
              <skill.icon className="mb-4 h-8 w-8 text-emerald-500 transition-transform group-hover:scale-110 sm:mb-6 sm:h-10 sm:w-10" />
              <h3 className="mb-2 text-xl font-bold text-zinc-950 dark:text-white sm:mb-3 sm:text-2xl">{skill.title}</h3>
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-400 sm:text-lg">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
