'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useParams, usePathname } from 'next/navigation';
import { LangSwitch } from '@/components/LangSwitch';
import { SayHi } from '@/components/SayHi';

import type { LangCode, Dictionary } from '@/dictionaries';

const DarkModeSwitch = dynamic(() => import('@/components/DarkModeSwitch').then((mod) => mod.DarkModeSwitch), { ssr: false });

const Nav = ({ dict }: { dict: Dictionary }) => {
  const params = useParams();
  const lang = params.lang as LangCode;

  const pathname = usePathname();

  const isCurrentPath = (path: string) => {
    let currentPath = pathname;
    if (currentPath.startsWith(`/${lang}`)) {
      currentPath = currentPath.replace(`/${lang}`, '');
    }
    return currentPath === path;
  };

  const pages = [
    {
      name: dict.nav.home,
      route: '/'
    },
    {
      name: dict.nav.projects,
      route: '/projects'
    },
    {
      name: dict.nav.contact,
      route: '/contact'
    }
  ];

  return (
    <nav
      className="w-full h-15 flex gap-5 text-base/15 items-center justify-end"
      aria-label="Primary"
      dev-mode="tailwind"
      data-dev-mode-react-name="Nav"
    >
      {!isCurrentPath('/') && <div className='flex-1 text-primary text-left font-bold text-2xl/15'><SayHi name="Xinran Liu" /></div>}
      <ul className="flex gap-15">
        {
          pages.map(page => {
            const href = `/${lang}${page.route}`;
            return (
              <li key={page.name} className={`${isCurrentPath(page.route) && 'text-primary'}`}>
                <Link href={href} aria-current={isCurrentPath(page.route) ? 'page' : undefined}>{page.name}</Link>
              </li>
            )
          })
        }
      </ul>
      <div className='text-stone-300' aria-hidden="true">|</div>
      <DarkModeSwitch />
      <LangSwitch />
      {/* todo: Github link， and documentation link */}
    </nav>
  );
};

export default Nav;
