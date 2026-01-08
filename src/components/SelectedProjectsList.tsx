'use client';

import { ProjectCard } from '@/components/ProjectCard';
import { useProjects } from '@/hooks/useProjects';

export const SelectedProjectsList = () => {
  const { selectedProjects } = useProjects();
  return (
    <>
      {selectedProjects.map(({ title, desc, github }) => (
        <ProjectCard key={title} title={title} desc={desc} github={github} role="listitem" />
      ))}
    </>
  );
};
