import Link from "next/link";

interface CardMindMapProps {
  mindMap: {
    id: string;
    title: string;
    lastUpdatedTime: string;
  };
}

export const CardMindMap = (props: CardMindMapProps) => {
    const { mindMap } = props;
  return (
    <Link href={"/mind-map/:mindMapId"} className="flex flex-col cursor-pointer">
      <div className="w-full h-40 bg-zinc-100 rounded-lg "></div>
      <div className="flex justify-between items-center">
        <h1 className="text-md font-medium">{mindMap.title}</h1>
        <p className="text-xs text-foreground">{mindMap.lastUpdatedTime}</p>
      </div>
    </Link>
  );
};
