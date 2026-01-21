import { faWrench, faScrewdriverWrench, faCode, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { LangCode } from "@/dictionaries";

export interface SkillSet {
  title: { [key in LangCode]: string },
  skills?: {
    name: string,
    level: 0 | 1 | 2 | 3 | 4 | 5,
  }[],
  icon: IconDefinition
}

export const skillSets: SkillSet[] = [{
  title: { en: 'Languages', zh: '编程语言' },
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
  title: { en: 'Frameworks & Libraries', zh: '框架与库' },
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
  title: { en: 'Tools', zh: '工具' },
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