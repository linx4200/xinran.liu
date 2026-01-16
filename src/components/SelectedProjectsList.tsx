import { ProjectCard } from '@/components/ProjectCard';
import { getSelectedProjects } from '@/services/projects';

import type { Locale } from '@/app/[lang]/dictionaries';

export const SelectedProjectsList = ({ lang }: { lang: Locale }) => {
  const selectedProjects = getSelectedProjects(lang);
  return (
    <>
      {selectedProjects.map(({ title, desc, github }) => (
        <ProjectCard key={title} title={title} desc={desc} github={github} role="listitem" />
      ))}
    </>
  );
};
