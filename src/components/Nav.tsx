'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkModeSwitch } from '@/components/DarkModeSwitch';
import { LangSwitch } from '@/components/LangSwitch';
import { SayHi } from '@/components/SayHi';

{/* todo: 是否有可能就改为自动获取到 page.tsx 文件, 而不用在这里手写 */}
const pages = [
  {
    name: 'Home',
    route: '/'
  },
  {
    name: 'Projects',
    route: '/projects'
  },
  // {
  //   name: 'Blog',
  //   route: '/blog'
  // },
  {
    name: 'Hire Me',
    route: '/contact'
  }
  // todo: 留言板
];

const Nav = () => {
  const pathname = usePathname();
  return (
    // <nav className={`w-full h-15 flex gap-5 text-base/15 items-center ${pathname !== '/' ? 'justify-between' : 'justify-end'}`}>
    <nav className="w-full h-15 flex gap-5 text-base/15 items-center justify-end" aria-label="Primary" dev-mode="tailwind">
      {pathname !== '/' && <div className='flex-1 text-primary text-left font-bold text-2xl/15'><SayHi name="Xinran Liu" /></div>}
      <ul className="flex gap-15">
        {
          pages.map(page => (
            <li key={page.name} className={`${pathname === page.route && 'text-primary'}`}>
              <Link href={page.route} aria-current={pathname === page.route ? 'page' : undefined}>{page.name}</Link>
            </li>
          ))
        }
      </ul>
      <div className='text-stone-300' aria-hidden="true">|</div>
      <DarkModeSwitch />
      <LangSwitch />
      {/* todo: Github link */}
    </nav>
  );
};

export default Nav;
