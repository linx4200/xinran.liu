import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <section className="mt-20" aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="text-2xl font-bold" dev-mode="tailwind">Projects</h1>
      <ul className="flex flex-wrap gap-[5%] list-none p-0" role="list" dev-mode="tailwind">
        {projects.map(project => (
          <li key={project.title} className="w-[30%] mt-10" role="listitem">
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
