export function Footer() {
  return (
    <footer className="section-render relative z-10 border-t border-zinc-200 bg-white py-12 dark:border-zinc-900 dark:bg-[#050505]">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-mono tracking-wider text-zinc-500">
          &copy; {new Date().getFullYear()} Mohamad Faris Danial. Built with React & Motion.
        </p>
      </div>
    </footer>
  );
}
