import Link from 'next/link';
import { ProjectCard } from '@/app/components/ProjectCard';
import { SkillSetList } from '@/app/components/SkillSet';
import { SayHi } from '@/app/components/SayHi';
import { selectedProjects } from '@/app/data/projects';

export default function Home() {
  return (
    <>
      <section className="w-full mt-20 text-center">
        <h1 className="text-5xl font-bold mb-4"><SayHi name="Hi, I&#39;m Xinran Liu" />.</h1>
        <p className="text-lg text-stone-500">An independent web developer specializing in building fast, modern, <br/>and maintainable web applications.</p>
        {/* todo: developer mode switch */}
      </section>
      <section className="w-full mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Selected Projects</h2>
        <div className="flex gap-20">
          {selectedProjects.map(project => (
            <ProjectCard key={project.title} title={project.title} desc={project.desc} />
          ))}
        </div>
      </section>
      <section className="w-full mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Skills & Expertise</h2>
        <div className="flex gap-20">
          <SkillSetList title="Languages" skills={[{
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
          }]} />
          <SkillSetList title="Frameworks & Libraries" />
          <SkillSetList title="Tools" />
        </div>
      </section>
      <section className="w-full mt-20 text-center bg-stone-50 py-10">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        {/* todo: refine this copy （或者是留言板的入口） */}
        <p className="text-base text-stone-500 mb-8">If you&#39;re interested in working together or just want<br />to say hello, please reach out!</p>
        <Link className="border-primary border-1 rounded-lg py-2 px-4 text-primary text-base" href="/contact">Contact Me</Link>
      </section>
    </>
  );
}
