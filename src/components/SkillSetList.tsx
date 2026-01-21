import { SkillSet } from "./SkillSet";
import { getSkillSets } from "@/services/skills";

export const SkillSetList = ({ lang }: { lang: string }) => {
  const list = getSkillSets(lang);
  return (
    <>
      {list.map(skillSet => (
        <SkillSet key={skillSet.title} {...skillSet} />
      ))}
    </>
  )
}