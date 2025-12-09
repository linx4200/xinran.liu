import { Card } from '@/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

type Props = {
  title: string,
  desc?: string,
  tags?: string[],
  site?: string,
  github?: string,
  role?: string
}

export const ProjectCard = (props: Props) => {
  const { title, desc, tags, site, github, role } = props;
  const safeTitleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'project';
  const titleId = `project-${safeTitleSlug}`;
  const descriptionId = desc ? `${titleId}-description` : undefined;
  return (
    <Card className="group relative h-fit transition-colors duration-200" role={role ?? 'article'} aria-labelledby={titleId} aria-describedby={descriptionId}>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.05),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.04),transparent_30%)]" />
      <div
        role="img"
        aria-label={`${title} project preview with vibrant gradient colors`}
        className="w-full aspect-square rounded-md overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 40%, #6dd5ed 100%)',
        }}
      />
      <div className="mt-5 text-left">
        <h3 id={titleId} className="text-base font-semibold mb-1" dev-mode="tailwind">{title}</h3>
        { desc && <p id={descriptionId} className="text-base/normal text-stone-500" dev-mode="tailwind">{desc}</p> }
      </div>
      { tags && <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(tag => (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full" key={tag}>{tag}</span>
        ))}
      </div> }
      { (site || github) && <div className="flex gap-4 mt-3 text-gray-400 justify-end">
        { site && <a target='_blank' rel="noreferrer noopener" href={site} className="size-4.5" aria-label={`Open ${title} live site`}>
          <FontAwesomeIcon icon={faLink} color='#aaa' />
        </a>}
        { github && <a target='_blank' rel="noreferrer noopener" href={github} className="size-4.5" aria-label={`Open ${title} on GitHub`}>
          <FontAwesomeIcon icon={faGithub} color='#aaa' />
        </a>}
      </div>}
    </Card>
  )
}

export const devModeReact = true;
