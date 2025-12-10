const Footer = () => {
  const year = (new Date()).getFullYear();
  return (
    <footer className="
      w-full mt-20
      border-t border-zinc-200/70 dark:border-zinc-800/80
      sm:flex-row"
    >
      <p className="text-xs text-text-muted/50 my-4">
        © {year} Xinran Liu. Built with Next.js, React, Tailwind CSS & <span className="text-base">♥</span>.
      </p>
    </footer>
  );
};

export default Footer;