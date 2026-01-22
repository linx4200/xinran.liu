import Link from 'next/link';

import { SayHi } from '@/components/SayHi';
import { DevModeToggle } from '@/components/developer-mode/Toggle';
import { SelectedProjectsList } from '@/components/SelectedProjectsList';
import { SkillSetList } from '@/components/SkillSetList';
import { getDictionary } from '@/dictionaries';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="w-full mt-20 text-center" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-3xl md:text-5xl font-bold pb-1 mb-5 dark:text-primary" dev-mode="tailwind"><SayHi name={dict.home.hero.greeting} />.</h1>
        <p className="text-base md:text-lg text-text-muted" dev-mode="tailwind">{dict.home.hero.description.split(' ').map((word: string, i: number) => {
          if (i === 7) return <span key={i}>{word} <br /></span>
          return word + ' '
        })}</p>
        <DevModeToggle />
      </section>

      <section className="w-full mt-10 lg:mt-20 lg:text-center" aria-labelledby="selected-projects-heading">
        <h2 id="selected-projects-heading" className="pl-4 lg:pl-0 text-xl md:text-2xl font-bold mb-5" dev-mode="tailwind"><Link href="/projects">{dict.home.sections.selectedProjects}</Link></h2>
        <SelectedProjectsList lang={lang} />
      </section>

      {/* <section className="w-full mt-20 text-center" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-2xl font-bold mb-5" dev-mode="tailwind">{dict.home.sections.skills}</h2>
        <div className="flex gap-20" dev-mode="tailwind">
          <SkillSetList lang={lang} />
        </div>
      </section> */}

      {/* <section className="w-full mt-20 text-center bg-surface py-10" aria-labelledby="contact-heading" dev-mode="tailwind">
        <h2 id="contact-heading" className="text-2xl font-bold mb-5" dev-mode="tailwind">{dict.home.sections.contact.title}</h2>
        <p className="text-base text-text-muted mb-8" dev-mode="tailwind">{dict.home.sections.contact.description}</p>
        <Link className="py-2 px-4
          border border-solid rounded-lg
          text-base border-primary text-primary hover:bg-primary/5 transition-colors" href="/contact" dev-mode="tailwind">{dict.home.sections.contact.button}</Link>
      </section> */}
    </>
  );
}
