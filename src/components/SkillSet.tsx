import { Card } from '@/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { LocalizedSkillSet } from '@/services/skills';

const LEVEL_MAX = 5;

enum LEVEL_EXPLANATION {
  'None', /*: 尚未掌握或不具备该技能 */
  'Basic', /*: 具备基础了解，可完成简单任务 */
  'Familiar', /*: 熟悉常见用法，能在指导下使用 */
  'Proficient', /*: 熟练掌握，能独立完成项目 */
  'Advanced', /*: 深入理解原理，能优化和指导他人 */
  'Expert' /*: 精通该领域，能设计架构或定义最佳实践 */
}

export const SkillSet = (props: LocalizedSkillSet) => {
  const { title, skills = [], icon } = props;

  const skillItems = skills.map((skill) => (
    <li
      className="flex gap-3 not-last:mb-5 items-center group relative"
      key={skill.name}
      aria-label={`${skill.name}, ${LEVEL_EXPLANATION[skill.level]} proficiency, level ${skill.level} of ${LEVEL_MAX}`}
      dev-mode="tailwind"
    >
      <span className="size-4 leading-4">
        <FontAwesomeIcon icon={icon} color='var(--color-stone-300)' aria-hidden="true" />
      </span>
      <span className='flex-1 text-base/normal'>{skill.name}</span>
      <div className='w-[calc(40px+var(--spacing)*4)]'>
        {
          Array.from({ length: LEVEL_MAX }).map((_, index) => (
            <span key={index}
              aria-hidden="true"
              className={`inline-block not-last:mr-1 size-[8px] rounded-[8px] ${index < skill.level ? 'bg-primary' : 'bg-surface-strong'}`}></span>
          ))
        }
      </div>
      <span className="sr-only">
        {`Proficiency level: ${LEVEL_EXPLANATION[skill.level]} (${skill.level} of ${LEVEL_MAX}).`}
      </span>
      <span className="
        hidden group-hover:block
        absolute right-0 -bottom-5 px-2
        rounded-sm text-xs/normal
        text-white dark:text-text
        bg-border/75
        after:absolute after:-top-[8px] after:right-[8px]
        after:border-4 after:size-0
      after:border-b-border/75 after:border-transparent
        ">{LEVEL_EXPLANATION[skill.level]}</span>
    </li>
  ));

  return (
    <Card data-dev-mode-react-name="SkillSet">
      <p className="font-semibold mb-5" dev-mode="tailwind">{title}</p>
      <ul>
        {skillItems}
      </ul>
    </Card>
  )
}
