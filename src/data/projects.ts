export const projects = [
  {
    selected: true,
    title: 'Vue Color',
    desc: 'A modern collection of Vue color pickers – fast, accessible, and easy to use.',
    tags: ['Vue', 'TypeScript', 'Vite'],
    site: 'https://linx4200.github.io/vue-color/',
    github: 'https://github.com/linx4200/vue-color'
  },
  {
    selected: true,
    title: 'AfterZzz Alarm',
    desc: 'AfterZzz is a minimalist smart alarm that wakes you up after you actually fall asleep.',
    tags: ['React Native', 'TypeScript'],
    github: 'https://github.com/linx4200/AfterZzz-Alarm'
  },
  {
    selected: true,
    title: 'xinran.liu — Independent Developer Portfolio',
    desc: 'Designed and developed A personal website that reflects my work and identity as a professional independent web developer.',
    tags: ['React', 'Tailwind', 'Next.js'],
    github: 'https://github.com/linx4200/xinran.liu',
  },
  {
    title: 'Future',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['AAA', 'BBB', 'CCC', 'DDD', 'FFF', 'asc'],
  },
  {
    title: '中文测试',
    desc: '如今互联网提供各种各样版本的Lorem Ipsum段落，但是大多数都多多少少出于刻意幽默或者其他随机插入的荒谬单词而被篡改过了。',
    site: 'https://www.google.com'
  }
];

export const selectedProjects = projects.filter(p => p.selected);