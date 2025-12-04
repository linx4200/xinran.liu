import { useState } from 'react';

type Lang = 'en' | 'zh-CN';

export const LangSwitch = () => {

  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'zh-CN' : 'en';
    setLang(newLang);
  };

  const selectedStyle = 'size-4 top-4/20 left-5/20 text-white bg-stone-800 z-10';
  const normalStyle = 'size-4 top-8/20 left-9/20 border border-stone-800';

  return (
    <button
      className="relative size-10 text-xs/4 text-stone-800 rounded-full hover:bg-stone-200 cursor-pointer"
      onClick={toggleLang}
    >
      <span className={`absolute text-tiny ${lang === 'en' ? selectedStyle : normalStyle}`}>EN</span>
      <span className={`absolute ${lang === 'zh-CN' ? selectedStyle : normalStyle}`}>中</span>
    </button>
  );
};

export const devModeReact = true;