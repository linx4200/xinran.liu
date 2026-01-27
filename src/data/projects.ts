import type { LangCode } from '@/dictionaries';


export type Project = {
  selected?: boolean;
  title: { [key in LangCode]: string };
  desc: { [key in LangCode]: string };
  tags?: string[];
  site?: string;
  github?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    selected: true,
    title: { en: 'Vue Color', zh: 'Vue Color' },
    desc: {
      en: 'A modern collection of Vue color pickers – fast, accessible, and easy to use.',
      zh: '一个现代化的 Vue 颜色选择器集合 —— 快速、无障碍且易于使用。',
    },
    tags: ['Vue', 'TypeScript', 'Vite'],
    image: '/images/vuecolor-1.png',
    site: 'https://linx4200.github.io/vue-color/',
    github: 'https://github.com/linx4200/vue-color',
  },
  {
    selected: true,
    title: { en: 'AfterZzz Alarm', zh: 'AfterZzz Alarm' },
    desc: {
      en: 'AfterZzz is a minimalist smart alarm that wakes you up after you actually fall asleep.',
      zh: 'AfterZzz 是一款极简智能闹钟，能在你真正入睡后才唤醒你。',
    },
    image: '/images/afterzzz-1.png',
    tags: ['React Native', 'TypeScript'],
    github: 'https://github.com/linx4200/AfterZzz-Alarm',
  },
  {
    selected: true,
    title: {
      en: 'xinran.liu — Independent Developer Portfolio',
      zh: 'xinran.liu — 独立开发者作品集',
    },
    desc: {
      en: 'Designed and developed A personal website that reflects my work and identity as a professional independent web developer.',
      zh: '设计并开发了一个反映我作为专业独立 Web 开发者工作和身份的个人网站。',
    },
    tags: ['React', 'Tailwind', 'Next.js'],
    image: '/images/personal-website-2.png',
    github: 'https://github.com/linx4200/xinran.liu',
  },
  {
    title: { en: 'Future', zh: '未来' },
    desc: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      zh: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    tags: ['AAA', 'BBB', 'CCC', 'DDD', 'FFF', 'asc'],
  },
  {
    title: { en: 'Chinese Test', zh: '中文测试' },
    desc: {
      en: 'Nowadays, the Internet provides various versions of Lorem Ipsum paragraphs, but most of them have been tampered with due to deliberate humor or other random insertion of absurd words.',
      zh: '如今互联网提供各种各样版本的Lorem Ipsum段落，但是大多数都多多少少出于刻意幽默或者其他随机插入的荒谬单词而被篡改过了。',
    },
    site: 'https://www.google.com',
  },
];