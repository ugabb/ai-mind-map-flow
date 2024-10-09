interface CardActionsProps {
  children: React.ReactNode;
}

export const CardActions = (props: CardActionsProps) => {
  return (
    <div className="flex gap-3 items-center p-5 bg-zinc-100 text-md font-medium rounded-lg min-w-32 cursor-pointer hover:bg-indigo-500/10">
      {props.children}
    </div>
  );
};
