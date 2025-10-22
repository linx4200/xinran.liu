import { Card } from '@/app/components/Card';

type Props = {
  title: string,
  desc?: string,
  mode?: 'concise' | 'normal',
}

export const ProjectCard = (props: Props) => {
  const { title, desc } = props;
  return (
    <Card>
      {/* todo: replace with image */}
      <div className="w-full aspect-square bg-stone-200 rounded-md">🎨</div>
      <div className="mt-5 text-left">
        <div className="text-base font-semibold mb-1">{title}</div>
        { desc && <p className="text-base/normal text-stone-500">{desc}</p> }
      </div>
    </Card>
  )
}