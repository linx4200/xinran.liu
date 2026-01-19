export type Props = {
  classNamesString: string;
}

export const TailwindInfo = ({ classNamesString }: Props) => {
  return (
    <div className="text-white">
      {classNamesString}
    </div>
  )
}

export const getInfo: (target: HTMLElement | null) => (undefined | { props: Props, ele: HTMLElement }) = (target) => {

  if (target === null || target.tagName === 'BODY' || target.tagName === 'HTML') return;

  const attributeArr = Array.from(target.attributes);
  const flagAttrs = attributeArr.filter(attr => attr.name === 'dev-mode');

  if (!flagAttrs.length || flagAttrs[0].value !== 'tailwind') {
    return getInfo(target.parentElement);
  }

  const classNamesStringAttrs = attributeArr.filter(attr => attr.name === 'class');
  if (!classNamesStringAttrs.length) return;

  const classNamesString = classNamesStringAttrs[0].value.replace('dev-mode-container-active', '');

  return { props: { classNamesString }, ele: target }
}