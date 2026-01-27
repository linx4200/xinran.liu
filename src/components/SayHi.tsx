type Props = {
  name: string,
}

export const SayHi = ({ name }: Props) => {
  return (
    <span className="group relative" data-dev-mode-react-name="SayHi">
      {name}
      <span className="
        absolute left-0 top-1/10
        transform-[translateX(-150%)]
        origin-[-75%]
        opacity-0
        leading-none
        transition
        group-hover:opacity-100
        group-hover:animate-wiggle"
        aria-hidden="true"
      >👋</span>
    </span>
  )
};