import { Skeleton } from "@/components/ui/skeleton"

export const CardMindMapSkeleton = () => {
  return (
    <div className="flex flex-col p-3 rounded-xl border border-zinc-200">
      <Skeleton className="w-full h-40 bg-zinc-100 rounded-lg" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}
