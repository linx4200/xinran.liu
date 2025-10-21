'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    name: 'Contact',
    route: '/contact'
  }
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className='flex w-full h-15 text-base/15 justify-between'>
      <div className='w-50 text-primary text-left font-bold text-2xl/15'>Xinran Liu</div>
      <ul className='flex w-2xl text-right'>
        {
          pages.map(page => (
            <li key={page.name} className={`flex-1 ${pathname === page.route && 'text-primary'}`}>
              <Link href={page.route}>{page.name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Nav;