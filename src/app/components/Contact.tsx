import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const contactLinks = [
  {
    label: "Contact Me",
    href: "mailto:farismalekofficial@gmail.com",
    icon: Mail,
    eyebrow: "Email | Phone | Malaysia",
    description: "farismalekofficial@gmail.com | +60 13 5858 199. Based in Malaysia and open to technical roles or project discussions.",
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamad-faris-danial-abdul-malek-497246294",
    icon: Linkedin,
    eyebrow: "Professional Profile",
    description: "Background, experience, and ongoing work across IT support, development, and deployment.",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/penyululz",
    icon: Github,
    eyebrow: "Projects & Code",
    description: "Examples of web apps, system setups, and the code I review, adapt, and deploy.",
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-render relative bg-transparent py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
            className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-zinc-50/80 shadow-[0_20px_50px_-34px_rgba(24,24,27,0.2)] sm:rounded-[2rem] dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-none"
        >
          <div className="grid gap-6 p-5 sm:gap-8 sm:p-7 md:p-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center xl:gap-10 xl:p-10">
            <div>
              <div className="section-heading-stack">
                <span className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.24em] text-emerald-600 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.26em] dark:text-emerald-400">
                  Contact
                </span>

                <h2 className="display-title text-3xl font-black leading-[0.94] tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-4xl md:text-5xl xl:text-[4.2vw]">
                  CONTACT
                  <br />
                  <span className="text-emerald-500 dark:text-emerald-400">ME</span>
                </h2>

                <p className="section-heading-copy max-w-lg text-sm leading-relaxed text-zinc-700 dark:text-zinc-400 sm:text-base md:text-lg">
                  Open to conversations about IT support, web application work, deployment tasks, and practical technical roles. I focus on clear communication and usable solutions.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {contactLinks.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer noopener" : undefined}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 + index * 0.08 }}
                  className="group flex min-h-[8.5rem] flex-col justify-between rounded-[1.25rem] border border-zinc-200 bg-white p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-500/40 sm:min-h-[9.5rem] sm:rounded-[1.5rem] sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-emerald-500/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 sm:h-12 sm:w-12 dark:text-emerald-400">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-600 dark:text-zinc-500 dark:group-hover:text-emerald-400" />
                  </div>

                  <div className="mt-4 sm:mt-5">
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-500">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-2xl">
                      {item.label}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
