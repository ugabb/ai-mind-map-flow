import { useGenerateMindMap } from "@/components/GenerateMindMapModal/hooks/useGenerateMindMap";
import { Button } from "@/components/ui/button";
import { ImSpinner8 } from "react-icons/im";

export function EmptyMindMap() {
  const { mutateAsync: generateMindMap, isPending: isGeneratingMindMap } =
    useGenerateMindMap();
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br dark:from-black dark:to-white/10 opacity-40 from-white to-black/20" />
      <h1 className="text-2xl font-bold">No Mind Map Yet</h1>
      <p className="text-sm text-muted-foreground">
        Create a mind map to get started
      </p>
      <Button
        variant={"outline"}
        size={isGeneratingMindMap ? "icon" : "default"}
        onClick={() => generateMindMap()}
        disabled={isGeneratingMindMap}
      >
        {isGeneratingMindMap ? (
          <ImSpinner8 className="animate-spin size-4" />
        ) : (
          "Generate Mind Map"
        )}
      </Button>
    </div>
  );
}
