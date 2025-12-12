import { faWrench, faScrewdriverWrench, faCode, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { useLangSettingsStore } from '@/store/useLangSettingsStore';

export type SkillSet = {
  title: { en: string; 'zh-CN': string },
  skills?: {
    name: string,
    level: 0 | 1 | 2 | 3 | 4 | 5,
  }[],
  icon: IconDefinition
}

const skillSets: SkillSet[] = [{
  title: { en: 'Languages', 'zh-CN': '编程语言' },
  skills: [
    {
      name: 'JavaScript(ES6+)',
      level: 5
    },
    {
      name: 'TypeScript',
      level: 5
    },
    {
      name: 'HTML & CSS',
      level: 4
    }
  ],
  icon: faCode
},
{
  title: { en: 'Frameworks & Libraries', 'zh-CN': '框架与库' },
  icon: faWrench,
  skills: [
    {
      name: 'React',
      level: 4
    },
    {
      name: 'Vue.js',
      level: 4
    },
    {
      name: 'Next.js',
      level: 3
    },
    {
      name: 'Tailwind CSS',
      level: 3
    }
  ]
},
{
  title: { en: 'Tools', 'zh-CN': '工具' },
  icon: faScrewdriverWrench,
  skills: [{
    name: 'Webpack',
    level: 4
  },
  {
    name: 'Vite',
    level: 4
  }
  ]
}
];

export const useSkillSets = () => {
  const lang = useLangSettingsStore((state) => state.lang);
  return skillSets.map((skillSet) => ({
    ...skillSet,
    title: lang === 'en' ? skillSet.title.en : skillSet.title['zh-CN']
  }))
};
