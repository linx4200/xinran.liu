type Props = React.ComponentPropsWithoutRef<'div'>;

export const Card = (props: Props) => {
  return (
    <div className="w-full bg-stone-50 rounded-md p-5 text-left">
      {props.children}
    </div>
  );
};