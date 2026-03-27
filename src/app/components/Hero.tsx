import { motion, type Variants } from "motion/react";
import { ArrowDownRight, Download } from "lucide-react";
import { siteConfig } from "../site";

const heroImageSrc = "/hero-image.jpg";
const backgroundVideoByTheme = {
  light: "/background-light.mp4",
  dark: "/background-dark.mp4",
} as const;

export function Hero({ theme }: { theme: "light" | "dark" }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, damping: 20, stiffness: 100 },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-start justify-center overflow-x-hidden pt-28 pb-12 sm:items-center sm:pt-32 sm:pb-16 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          key={theme}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src={backgroundVideoByTheme[theme]} type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(180deg, rgba(5,5,5,0.56), rgba(5,5,5,0.7)), radial-gradient(circle at 18% 16%, rgba(16,185,129,0.12), transparent 26%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.05), transparent 20%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0.58)), radial-gradient(circle at 18% 16%, rgba(5,150,105,0.08), transparent 24%), radial-gradient(circle at 82% 18%, rgba(24,24,27,0.03), transparent 18%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="container relative z-10 mx-auto w-full px-6"
      >
        <div className="grid h-full items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Main Typography */}
          <div className="z-20 lg:col-span-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              <div className="mb-3 overflow-hidden">
                <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4">
                  <span className="h-[2px] w-10 bg-emerald-500 sm:w-12" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400 sm:text-sm sm:tracking-widest">
                    Software Engineer
                  </span>
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.h1 
                  variants={itemVariants}
                  className="display-title inline-block text-[16vw] font-black leading-[0.86] tracking-[-0.045em] text-zinc-900 [text-wrap:balance] dark:text-zinc-100 sm:text-[12vw] lg:text-[7vw]"
                >
                  FARIS
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  variants={itemVariants}
                  className="display-title inline-block text-[16vw] font-black leading-[0.86] tracking-[-0.045em] text-emerald-500 [text-wrap:balance] dark:text-emerald-400 sm:text-[12vw] lg:text-[7vw]"
                >
                  DANIAL
                </motion.h1>
              </div>

              <div className="mt-6 max-w-xl overflow-hidden sm:mt-8">
                <motion.p 
                  variants={itemVariants}
                  className="text-base font-light leading-relaxed text-zinc-700 dark:text-zinc-400 sm:text-lg md:text-xl"
                >
                  Bridging IT infrastructure with robust SaaS development. 
                  Currently engineering scalable platforms and pursuing Computer Science.
                </motion.p>
              </div>

              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4 sm:mt-12 sm:gap-6">
                <a 
                  href="#project-fmp"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.02] dark:bg-white dark:text-black sm:px-8 sm:py-4 sm:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-emerald-400 transition-transform duration-200 ease-out group-hover:translate-y-0" />
                  <span className="relative z-10">Explore Work</span>
                  <ArrowDownRight className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:rotate-[-45deg]" />
                </a>

                <a
                  href={siteConfig.resumeHref}
                  download={siteConfig.resumeDownloadName}
                  className="flex items-center gap-3 rounded-full border border-zinc-300 bg-white/86 px-6 py-3.5 text-sm font-semibold text-zinc-900 shadow-[0_16px_34px_-24px_rgba(24,24,27,0.45)] backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-white sm:px-8 sm:py-4 sm:text-base"
                >
                  <Download className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  <span>Download Resume</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex items-center justify-center lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
              className="aspect-[3/4] w-full max-w-[12rem] overflow-hidden rounded-full border border-zinc-200 grayscale sm:max-w-[15rem] dark:border-zinc-800"
            >
              <img
                src={heroImageSrc}
                alt="Portrait of Mohamad Faris Danial"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover scale-110"
              />
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="hidden items-center justify-center lg:col-span-4 lg:flex">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
              className="aspect-[3/4] w-full max-w-[26rem] overflow-hidden rounded-full border border-zinc-200 grayscale transition-all duration-300 hover:grayscale-0 dark:border-zinc-800/50"
            >
              <div className="absolute inset-0 z-10 bg-emerald-500/10 mix-blend-overlay" />
              <img
                src={heroImageSrc}
                alt="Portrait of Mohamad Faris Danial"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover scale-110"
              />
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="animate-float-soft absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 dark:text-zinc-500 sm:flex">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
