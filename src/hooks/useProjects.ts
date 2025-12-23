import { useLangSettingsStore } from '@/store/useLangSettingsStore';
import { projects as rawProjects } from '@/data/projects';

export const useProjects = () => {
  const { lang } = useLangSettingsStore();

  const projects = rawProjects.map(p => ({
    ...p,
    title: p.title[lang],
    desc: p.desc[lang],
  }));

  const selectedProjects = projects.filter(p => p.selected);

  return { projects, selectedProjects };
};
