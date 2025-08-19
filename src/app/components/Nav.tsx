import Link from 'next/link';

const Nav = () => {
  // todo: active status
  return (
    <nav>
      <ul>
        {/* todo: 是否有可能就改为自动获取到 page.tsx 文件, 而不用在这里手写 */}
        <li><Link href="/">Home</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;