import Image from 'next/image'
import Link from 'next/link'
import type { MindMapResponse } from '@/types/mind-map'
import { formatDateTime } from '@/utils/formatDate'

type CardMindMapProps = {
  mindMap: MindMapResponse
}

export const CardMindMap = (props: CardMindMapProps) => {
  const { mindMap } = props

  return (
    <Link
      className="flex cursor-pointer flex-col rounded-xl border border-border p-3 transition-all duration-200 hover:shadow-xl"
      href={`/mind-map/${mindMap.id}`}
    >
      <Image
        alt="Default Thumbnail"
        className="h-40 w-full rounded-lg bg-muted object-contain"
        height={160}
        src="/assets/dafault-thumbnail.png"
        width={160}
      />
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-foreground text-md">{mindMap.title}</h1>
        <p className="text-foreground text-xs">
          {formatDateTime(mindMap.updatedAt)}
        </p>
      </div>
    </Link>
  )
}
