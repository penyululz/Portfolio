import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="section-render relative z-10 bg-transparent py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="section-heading-stack lg:col-span-5"
          >
            <h2 className="display-title text-[18vw] font-black leading-[0.88] tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-[13vw] lg:text-[6vw]">
              ABOUT<br/><span className="text-emerald-500 dark:text-emerald-400">ME</span>
            </h2>
            <div className="h-2 w-16 rounded-full bg-emerald-500 sm:w-20" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 lg:col-span-7 lg:space-y-8"
          >
            <p className="text-xl font-light leading-relaxed text-zinc-900 dark:text-white sm:text-2xl md:text-3xl">
              I started with <strong className="font-bold text-emerald-600 dark:text-emerald-400">hardware work and IT support</strong>, learning how to diagnose problems, keep systems running, and help users solve real technical issues.
            </p>
            
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-400 sm:text-lg md:text-xl">
              That experience led me into web development and system building. I use AI tools to move faster, but I still review, debug, and improve the output myself so the final result is usable, stable, and ready to deploy.
            </p>

            <div className="mt-8 grid gap-6 border-t border-zinc-200 pt-6 dark:border-zinc-800/50 sm:grid-cols-2 sm:gap-8 sm:pt-8">
              <div>
                <h3 className="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-4">Education Path</h3>
                <ul className="space-y-3 text-zinc-800 dark:text-zinc-300">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Bachelor in Computer Science, Management & Science University (MSU)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full dark:bg-zinc-600" />
                    2025 - Present | Part-time, weekend classes
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-4">Core Philosophy</h3>
                <p className="text-zinc-700 dark:text-zinc-400">
                  I focus on building real systems that work in practice, not just prototypes. Clear structure, reliable behavior, and steady iteration matter more to me than overcomplicating the stack.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
