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
    <Card
      className="group relative h-fit transition-colors duration-200"
      role={role ?? 'article'}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-dev-mode-react-name="ProjectCard"
    >
      <span className="
        pointer-events-none
        absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.05),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.04),transparent_30%)]
        dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_30%)]"
      />
      {/* todo: replace with real image */}
      <div
        role="img"
        aria-label={`${title} project preview with vibrant gradient colors`}
        className="w-full aspect-square rounded-md overflow-hidden bg-[linear-gradient(135deg,#ff7e5f_0%,#feb47b_40%,#6dd5ed_100%)] dark:bg-[linear-gradient(135deg,#5e2d21_0%,#5e402b_40%,#204e5e_100%)]"
      />
      <div className="mt-5 text-left">
        <h3 id={titleId} className="text-base font-semibold mb-1" dev-mode="tailwind">{title}</h3>
        {desc && <p id={descriptionId} className="text-base/normal text-text-muted" dev-mode="tailwind">{desc}</p>}
      </div>
      {tags && <div className="flex flex-wrap gap-2 mt-5">
        {tags.map(tag => (
          <span className="text-xs text-text-muted bg-surface-strong px-2 py-1 rounded-full" key={tag}>{tag}</span>
        ))}
      </div>}
      {(site || github) && <div className="flex gap-4 mt-5 justify-end">
        {site && <a target='_blank' rel="noreferrer noopener" href={site} className="size-4.5" aria-label={`Open ${title} live site`}>
          <FontAwesomeIcon icon={faLink} color='var(--color-text-muted)' />
        </a>}
        {github && <a target='_blank' rel="noreferrer noopener" href={github} className="size-4.5" aria-label={`Open ${title} on GitHub`}>
          <FontAwesomeIcon icon={faGithub} color='var(--color-text-muted)' />
        </a>}
      </div>}
    </Card>
  )
}