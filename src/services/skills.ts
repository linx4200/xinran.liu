import { skillSets, SkillSet } from '@/data/skills';
import { resolveLocale } from '@/dictionaries';

export type LocalizedSkillSet = Omit<SkillSet, 'title'> & {
  title: string;
}

export const getSkillSets = (lang: string): LocalizedSkillSet[] => {
  const resolvedLang = resolveLocale(lang);
  return skillSets.map((skillSet) => ({
    ...skillSet,
    title: skillSet.title[resolvedLang]
  }));
};