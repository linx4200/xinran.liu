type Props = {
  classNamesString: string;
}

export const TailwindInfo = ({ classNamesString }: Props) => {
  return (
    <>
      {classNamesString}
    </>
  )
}

export const getInfo = (target: HTMLElement) => {

  const attributeArr = Array.from(target.attributes);
  const flagAttrs = attributeArr.filter(attr => attr.name === 'dev-mode');

  if (!flagAttrs.length) return;

  if (flagAttrs[0].value !== 'tailwind') return;

  const classNamesStringAttrs = attributeArr.filter(attr => attr.name === 'class');
  if (!classNamesStringAttrs.length) return;

  const classNamesString = classNamesStringAttrs[0].value;

  return { classNamesString }
}