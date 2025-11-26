import type { IconType } from "react-icons/lib";

interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: IconType;
}

export const CardActions = (props: CardActionsProps) => {
  const { icon: Icon, text, ...rest } = props;
  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg bg-muted p-5 font-medium text-md hover:bg-primary/10 md:min-w-32"
      {...rest}
    >
      {Icon && <Icon className="text-primary" size={30} />}
      {text && <p className="hidden md:block">{text}</p>}
    </div>
  );
};
