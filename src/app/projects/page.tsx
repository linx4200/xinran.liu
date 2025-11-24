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
    <div className="mt-20">
      <h1 className="text-2xl font-bold" dev-mode="tailwind">Projects</h1>
      <div className="flex flex-wrap gap-[5%]" dev-mode="tailwind">
        {projects.map(project => (
          <div key={project.title} className="w-[30%] mt-10">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
}