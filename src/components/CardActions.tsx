import { IconType } from "react-icons/lib";

interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  icon: IconType
}

export const CardActions = (props: CardActionsProps) => {
  const { icon: Icon, text, ...rest } = props;
  return (
    <div className="flex gap-3 items-center p-5 bg-zinc-100 text-md font-medium rounded-lg md:min-w-32 cursor-pointer hover:bg-indigo-500/10" {...rest}>
      {Icon && <Icon size={30} className="text-indigo-500" />}
      {text && <p className="hidden md:block">{text}</p>}
    </div>
  );
};
