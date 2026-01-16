import { skillSets, SkillSet } from '@/data/skills';
import type { Locale } from '@/dictionaries';

export type LocalizedSkillSet = Omit<SkillSet, 'title'> & {
  title: string;
}

export const getSkillSets = (lang: Locale): LocalizedSkillSet[] => {
  return skillSets.map((skillSet) => ({
    ...skillSet,
    title: skillSet.title[lang]
  }));
};