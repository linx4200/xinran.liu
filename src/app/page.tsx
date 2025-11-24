import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillSetList, type Props as SkillSetListProps } from '@/components/SkillSet';
import { SayHi } from '@/components/SayHi';
import { Toggle as DeveloperModeToggle } from '@/components/developer-mode/Toggle';
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
  ]},
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
      <section className="w-full mt-20 text-center">
        <h1 className="text-5xl font-bold pb-1 mb-5" dev-mode="tailwind"><SayHi name="Hi, I&#39;m Xinran Liu" />.</h1>
        <p className="text-lg text-stone-500" dev-mode="tailwind">I design and build fast, reliable, <br/>and scalable web applications for modern businesses.</p>
        <DeveloperModeToggle />
      </section>
      <section className="w-full mt-20 text-center">
        <h2 className="text-2xl font-bold mb-5" dev-mode="tailwind"><Link href="/projects">Selected Projects</Link></h2>
        <div className="flex gap-20" dev-mode="tailwind">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.title} title={project.title} desc={project.desc} github={project.github} />
          ))}
        </div>
      </section>
      <section className="w-full mt-20 text-center">
        <h2 className="text-2xl font-bold mb-5" dev-mode="tailwind">Skills & Expertise</h2>
        <div className="flex gap-20" dev-mode="tailwind">
          {skillSets.map(skillSet => (
            <SkillSetList key={skillSet.title} {...skillSet} />
          ))}
        </div>
      </section>
      <section className="w-full mt-20 text-center bg-stone-50 py-10" dev-mode="tailwind">
        <h2 className="text-2xl font-bold mb-5" dev-mode="tailwind">Get in Touch</h2>
        {/* todo: refine this copy （或者是留言板的入口） */}
        <p className="text-base text-stone-500 mb-8" dev-mode="tailwind">If you&#39;re interested in working together or just want<br />to say hello, please reach out!</p>
        <Link className="border-primary border-1 border-solid rounded-lg py-2 px-4 text-primary text-base" href="/contact"  dev-mode="tailwind">Contact Me</Link>
      </section>
    </>
  );
}
