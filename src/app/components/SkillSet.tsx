import { Card } from '@/app/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

const LEVEL_MAX = 5;

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

  // todo: hover 显示 level 的解释

  const skillItems = skills.map((skill) => (
    <li className="flex gap-3 not-last:mb-4 items-center" key={skill.name}>
      <span className="size-4 leading-4">
        <FontAwesomeIcon icon={icon} color='#bbb' />
      </span>
      <span className='flex-1 text-base/normal'>{skill.name}</span>
      <span className='w-[calc(40px+var(--spacing)*4)]'>
        {
          Array.from({ length: LEVEL_MAX }).map((_, index) => (
            <span key={index}
              className={`
                inline-block not-last:mr-1
                size-[8px] rounded-[8px]
                ${index < skill.level ? 'bg-primary' : 'bg-stone-200'}
              `}></span>
          ))
        }
      </span>
    </li>
  ));

  return (
    <Card>
      <p className="font-semibold mb-4">{title}</p>
      <ul>
        {skillItems}
      </ul>
    </Card>
  )
}