"use client";

import { SkillSet } from "./SkillSet";
import { useSkillSets } from "@/hooks/useSkillSets";

export const SkillSetList = () => {
  const list = useSkillSets();
  return (
    <>
      {list.map(skillSet => (
        <SkillSet key={skillSet.title} {...skillSet} />
      ))}
    </>
  )
}