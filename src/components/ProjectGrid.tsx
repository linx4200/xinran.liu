'use devModeReact';

import { ProjectCard } from '@/components/ProjectCard';
import { useProjects } from '@/hooks/useProjects';

export const ProjectGrid = () => {
  const { projects } = useProjects();
  return (
    <ul className="flex flex-wrap gap-[5%] list-none p-0" role="list" dev-mode="tailwind">
      {projects.map(project => (
        <li key={project.title} className="w-[30%] mt-10" role="listitem">
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  );
};