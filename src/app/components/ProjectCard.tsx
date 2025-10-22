import { Card } from '@/app/components/Card';

type Props = {
  title: string,
  desc?: string,
  tags?: string[],
  site?: string,
  github?: string
}

export const ProjectCard = (props: Props) => {
  const { title, desc, tags, site, github } = props;
  return (
    <Card>
      {/* todo: replace with image */}
      <div className="w-full aspect-square bg-stone-200 rounded-md overflow-hidden">🎨</div>
      <div className="mt-5 text-left">
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        { desc && <p className="text-base/normal text-stone-500">{desc}</p> }
      </div>
      { tags && <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(tag => (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full" key={tag}>{tag}</span>
        ))}
      </div> }
      { (site || github) && <div className="flex gap-4 mt-3 text-gray-400 justify-end">
        { site && <a href={site} className="hover:text-gray-700">💻</a>}
        { github && <a href={github} className="hover:text-gray-700">🔗</a>}
      </div>}
    </Card>
  )
}