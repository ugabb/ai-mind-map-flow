import { Skeleton } from "@/components/ui/skeleton";

export const CardMindMapSkeleton = () => (
  <div className="flex flex-col rounded-xl border border-border p-3">
    <Skeleton className="h-40 w-full rounded-lg bg-muted" />
    <div className="mt-2 flex items-center justify-between">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);
