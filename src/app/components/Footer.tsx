const Footer = () => {
  const year = 2025;
  return (
    <footer className="
      w-full
      border-t border-zinc-200/70 dark:border-zinc-800/80
      sm:flex-row"
    >
      <p className="text-xs text-stone-400 dark:text-zinc-400 my-4">
        © {year} Xinran Liu. Built with Next.js, React, Tailwind CSS & <span className="text-base">♥</span>.
      </p>
    </footer>
  );
  };

export default Footer;