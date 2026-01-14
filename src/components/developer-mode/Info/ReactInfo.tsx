type Props = {
  name: string;
  propList?: { key: string; value: string }[];
}

export const ReactInfo = ({ name, propList }: Props) => {
  return (
    <>
      <div>
        <span className="text-slate-400">&lt;</span>
        <span className="text-rose-700/90 font-bold">{name}</span>
        {!propList || propList.length === 0 && <span className="text-slate-400">&#47;&gt;</span>}
      </div>
      <div className="text-xs/normal">
        {propList?.map(({ key, value }) =>
          <div className="flex" key={key}>
            <span className="text-sky-600 indent-4">{key}</span>
            <span className="text-slate-400">=</span>
            <span className="text-orange-300/80 max-w-[300px] text-ellipsis line-clamp-1">{`"${value}`}</span>
            <span className="text-orange-300/80">{`"`}</span>
          </div>
        )}
      </div>
      {propList && propList.length > 0 && <div className="text-slate-400">&#47;&gt;</div>}
    </>
  )
}

export const getInfo = (target: HTMLElement) => {

  const componentNameAttrs = Array.from(target.attributes).filter(attr => attr.name === 'data-dev-mode-react-name');
  if (!componentNameAttrs.length) return;

  const componentName = componentNameAttrs[0].value;

  // todo: get props from data file

  return {
    name: componentName,
    propList: [{
      key: 'foo',
      value: 'bar'
    }]
  }
}