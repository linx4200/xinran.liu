import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillSetList, type Props as SkillSetListProps } from '@/components/SkillSet';
import { SayHi } from '@/components/SayHi';
import { DevModeToggle } from '@/components/developer-mode/Toggle';
import { selectedProjects } from '@/data/projects';
import { faWrench, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

const skillSets: SkillSetListProps[] = [{
  title: 'Languages',
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
  ]
},
{
  title: 'Frameworks & Libraries',
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
  title: 'Tools',
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

export default function Home() {
  return (
    <>
      <section className="w-full mt-20 text-center" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-5xl font-bold pb-1 mb-5 dark:text-primary" dev-mode="tailwind"><SayHi name="Hi, I&#39;m Xinran Liu" />.</h1>
        <p className="text-lg text-text-muted" dev-mode="tailwind">I design and build fast, reliable, <br />and scalable web applications for modern businesses.</p>
        <DevModeToggle />
      </section>
      <section className="w-full mt-20 text-center" aria-labelledby="selected-projects-heading">
        <h2 id="selected-projects-heading" className="text-2xl font-bold mb-5" dev-mode="tailwind"><Link href="/projects">Selected Projects</Link></h2>
        <div className="flex gap-20" role="list" dev-mode="tailwind">
          {selectedProjects.map(({ title, desc, github }) => (
            <ProjectCard key={title} title={title} desc={desc} github={github} role="listitem" />
          ))}
        </div>
      </section>
      <section className="w-full mt-20 text-center" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-2xl font-bold mb-5" dev-mode="tailwind">Skills & Expertise</h2>
        <div className="flex gap-20" dev-mode="tailwind">
          {skillSets.map(skillSet => (
            <SkillSetList key={skillSet.title} {...skillSet} />
          ))}
        </div>
      </section>

      <section className="w-full mt-20 text-center bg-surface py-10" aria-labelledby="contact-heading" dev-mode="tailwind">
        <h2 id="contact-heading" className="text-2xl font-bold mb-5" dev-mode="tailwind">Get in Touch</h2>
        {/* todo: refine this copy （或者是留言板的入口） */}
        <p className="text-base text-text-muted mb-8" dev-mode="tailwind">If you&#39;re interested in working together or just want<br />to say hello, please reach out!</p>
        <Link className="py-2 px-4
          border border-solid rounded-lg
          text-base border-primary text-primary hover:bg-primary/5 transition-colors" href="/contact" dev-mode="tailwind">Contact Me</Link>
      </section>
    </>
  );
}
