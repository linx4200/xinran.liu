import { projects } from '@/data/projects';
import type { Locale } from '@/dictionaries';

export interface LocalizedProject {
  selected?: boolean;
  title: string;
  desc: string;
  tags?: string[];
  site?: string;
  github?: string;
}

export const getAllProjects = (lang: Locale): LocalizedProject[] => {
  return projects.map((project) => ({
    ...project,
    title: project.title[lang],
    desc: project.desc[lang],
  }));
};

export const getSelectedProjects = (lang: Locale): LocalizedProject[] => {
  return getAllProjects(lang).filter((project) => project.selected);
};