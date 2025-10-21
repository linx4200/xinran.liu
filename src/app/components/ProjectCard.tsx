type Props = {
  title: string,
  desc?: string,
  mode?: 'concise' | 'normal',
}

export const ProjectCard = (props: Props) => {
  const { title, desc } = props;
  return (
    <div className="w-full bg-stone-50 rounded-md p-5">
      {/* todo: replace with image */}
      <div className="w-full aspect-square bg-stone-200 rounded-md">🎨</div>
      <div className="mt-5 text-left">
        <div className="text-xl font-semibold mb-1">{title}</div>
        { desc && <p className="text-base/normal text-stone-500">{desc}</p> }
      </div>
    </div>
  )
}