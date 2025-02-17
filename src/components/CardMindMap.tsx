import Link from "next/link";
import { formatDateTime } from "@/utils/formatDate";
import { MindMapResponse } from "@/types/mind-map";
import Image from "next/image";

interface CardMindMapProps {
  mindMap: MindMapResponse
}

export const CardMindMap = (props: CardMindMapProps) => {
  const { mindMap } = props;

  return (
    <Link
      href={`/mind-map/${mindMap.id}`}
      className="flex flex-col cursor-pointer hover:shadow-xl duration-200 transition-all p-3 rounded-xl border border-zinc-200"
    >
      <Image width={160} height={160} src="/assets/dafault-thumbnail.png" alt="Default Thumbnail" className="w-full h-40 bg-zinc-100 rounded-lg object-contain" />
      <div className="flex justify-between items-center">
        <h1 className="text-md font-medium text-foreground">{mindMap.title}</h1>
        <p className="text-xs text-foreground">{formatDateTime(mindMap.updatedAt)}</p>
      </div>
    </Link>
  );
};
