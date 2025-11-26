import { ImSpinner8 } from "react-icons/im";
import { useGenerateMindMap } from "@/components/GenerateMindMapModal/hooks/useGenerateMindMap";
import { Button } from "@/components/ui/button";

export function EmptyMindMap() {
  const { mutateAsync: generateMindMap, isPending: isGeneratingMindMap } =
    useGenerateMindMap();
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white to-black/20 opacity-40 dark:from-black dark:to-white/10" />
      <h1 className="font-bold text-2xl">No Mind Map Yet</h1>
      <p className="text-muted-foreground text-sm">
        Create a mind map to get started
      </p>
      <Button
        disabled={isGeneratingMindMap}
        onClick={() => generateMindMap()}
        size={isGeneratingMindMap ? "icon" : "default"}
        variant={"outline"}
      >
        {isGeneratingMindMap ? (
          <ImSpinner8 className="size-4 animate-spin" />
        ) : (
          "Generate Mind Map"
        )}
      </Button>
    </div>
  );
}
