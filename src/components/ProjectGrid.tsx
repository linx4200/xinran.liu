import { ProjectCard } from '@/components/ProjectCard';
import { getAllProjects } from '@/services/projects';
import type { Locale } from '@/dictionaries';

export const ProjectGrid = ({ lang }: { lang: Locale }) => {
  const projects = getAllProjects(lang);
  return (
    <ul className="flex flex-wrap gap-[5%] list-none p-0" role="list" dev-mode="tailwind" data-dev-mode-react-name="ProjectGrid">
      {projects.map(project => (
        <li key={project.title} className="w-[30%] mt-10" role="listitem">
          <ProjectCard {...project} />
        </li>
      ))}
    </ul>
  );
};