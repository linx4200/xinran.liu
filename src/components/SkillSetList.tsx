import { SkillSet } from "./SkillSet";
import { getSkillSets } from "@/services/skills";
import type { Locale } from "@/dictionaries";

export const SkillSetList = ({ lang }: { lang: Locale }) => {
  const list = getSkillSets(lang);
  return (
    <>
      {list.map(skillSet => (
        <SkillSet key={skillSet.title} {...skillSet} />
      ))}
    </>
  )
}