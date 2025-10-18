const Footer = () => {
  const year = 2025;
  return (<div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200/70 py-6 dark:border-zinc-800/80 sm:flex-row">
<p className="text-xs text-zinc-500 dark:text-zinc-400">
© {year} Xinran Liu. Built with Next.js, React & Tailwind CSS.
{/* todo: and love */}
</p>
</div>);
};

export default Footer;