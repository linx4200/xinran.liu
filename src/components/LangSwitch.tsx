import { useState } from 'react';

type Lang = 'en' | 'zh-CN';

export const LangSwitch = () => {

  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'zh-CN' : 'en';
    setLang(newLang);
  };

  const selectedStyle = 'top-4/20 left-5/20 z-10 text-white dark:text-bg bg-stone-800 dark:bg-text';
  const normalStyle = 'top-8/20 left-9/20 border border-stone-800 dark:border-text';

  return (
    <button
      type="button"
      className="relative size-10 rounded-full
        text-xs/4 text-stone-800 dark:text-text
        cursor-pointer hover:bg-surface-strong"
      onClick={toggleLang}
      aria-label={`Toggle language. Current language: ${lang === 'en' ? 'English' : 'Chinese'}.`}
      aria-pressed={lang === 'zh-CN'}
    >
      <span className={`absolute size-4 text-tiny ${lang === 'en' ? selectedStyle : normalStyle}`}>EN</span>
      <span className={`absolute size-4 ${lang === 'zh-CN' ? selectedStyle : normalStyle}`}>中</span>
    </button>
  );
};

export const devModeReact = true;
