import { ProjectCard } from '@/components/ProjectCard';
import { getSelectedProjects } from '@/services/projects';

export const SelectedProjectsList = ({ lang }: { lang: string }) => {
  const selectedProjects = getSelectedProjects(lang);
  return (
    <>
      {selectedProjects.map(({ title, desc, github }) => (
        <ProjectCard key={title} title={title} desc={desc} github={github} role="listitem" />
      ))}
    </>
  );
};
