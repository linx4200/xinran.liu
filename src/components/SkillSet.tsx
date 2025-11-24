import { Card } from '@/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

const LEVEL_MAX = 5;

enum LEVEL_EXPLANATION {
  'None', /*: 尚未掌握或不具备该技能 */
  'Basic', /*: 具备基础了解，可完成简单任务 */
  'Familiar', /*: 熟悉常见用法，能在指导下使用 */
  'Proficient', /*: 熟练掌握，能独立完成项目 */
  'Advanced', /*: 深入理解原理，能优化和指导他人 */
  'Expert' /*: 精通该领域，能设计架构或定义最佳实践 */
}

export type Props = {
  title: string,
  skills?: {
    name: string,
    level: 0 | 1 | 2 | 3 | 4 | 5,
  }[],
  icon?: IconDefinition
}

export const SkillSetList = (props: Props) => {
  const { title, skills = [], icon = faCode } = props;

  const skillItems = skills.map((skill) => (
    <li className="flex gap-3 not-last:mb-5 items-center group relative" key={skill.name} dev-mode="tailwind">
      <span className="size-4 leading-4">
        <FontAwesomeIcon icon={icon} color='#bbb' />
      </span>
      <span className='flex-1 text-base/normal'>{skill.name}</span>
      <div className='w-[calc(40px+var(--spacing)*4)]'>
        {
          Array.from({ length: LEVEL_MAX }).map((_, index) => (
            <span key={index}
              className={`inline-block not-last:mr-1 size-[8px] rounded-[8px] ${index < skill.level ? 'bg-primary' : 'bg-stone-200'}`}></span>
          ))
        }
      </div>
      <span className="
        hidden group-hover:block
        absolute right-0 -bottom-5 px-2
        rounded-sm text-xs/normal
        bg-gray-700/75 text-amber-50
        after:absolute after:-top-[8px] after:right-[8px]
        after:border-4 after:size-0
      after:border-b-gray-700/75 after:border-transparent
        ">{LEVEL_EXPLANATION[skill.level]}</span>
    </li>
  ));

  return (
    <Card>
      <p className="font-semibold mb-5" dev-mode="tailwind">{title}</p>
      <ul>
        {skillItems}
      </ul>
    </Card>
  )
}