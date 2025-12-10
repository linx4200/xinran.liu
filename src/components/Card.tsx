type Props = React.ComponentPropsWithoutRef<'div'>;

export const Card = ({ className, children, ...rest }: Props) => {
  return (
    <div className={`w-full p-5 bg-surface rounded-md text-left ${className ?? ''}`} {...rest} dev-mode="tailwind">
      {children}
    </div>
  );
};