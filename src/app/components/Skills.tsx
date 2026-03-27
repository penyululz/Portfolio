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
  const row1 = ["React", "TypeScript", "Tailwind CSS", "Go", "Python", "Astro"];
  const row2 = ["PostgreSQL", "Docker", "Linux", "Git", "Supabase", "Cybersecurity"];

  const softSkills = [
    { title: "Leadership & Strategy", icon: Users, desc: "Leading dev teams and steering technical delivery." },
    { title: "System Architecture", icon: Network, desc: "Designing scalable, secure, and robust IT environments." },
    { title: "Backend Systems", icon: Database, desc: "Building secure auth, APIs, and optimizing database logic." },
    { title: "Frontend Engineering", icon: Code2, desc: "Crafting highly responsive and modern user interfaces." },
  ];

  return (
    <section id="skills" className="section-render relative overflow-hidden bg-white py-20 dark:bg-[#050505] sm:py-24 lg:py-32">
      
      {/* Infinite Scrolling Ticker */}
      <div className="mb-14 flex flex-col gap-3 rotate-[-2deg] sm:mb-18 sm:gap-4 sm:scale-105 lg:mb-24">
        <MarqueeRow items={row1} speed={35} />
        <MarqueeRow items={row2} reverse speed={45} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 md:flex md:items-end md:justify-between lg:mb-16">
          <div>
            <h2 className="mb-4 text-3xl font-black leading-[0.92] tracking-[-0.05em] text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
              BEYOND <span className="text-zinc-500 dark:text-zinc-600">CODE</span>
            </h2>
            <p className="max-w-xl text-base text-zinc-700 dark:text-zinc-400 sm:text-lg">
              A comprehensive background bridging IT infrastructure, technical support, and full-stack engineering gives me a holistic view of the software lifecycle.
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
