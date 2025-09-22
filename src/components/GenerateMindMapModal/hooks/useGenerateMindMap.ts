import { generateMindMap } from "@/services/mind-map/generateMindMap";
import { useNodeStore } from "@/store/NodeStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useContentContext } from "../../ContentPage/ContentContext";

export function useGenerateMindMap() {
  const { contentId, rawTranscription } = useContentContext();
  const { setMindMapToGenerate } = useNodeStore();
  return useMutation({
    mutationKey: ["generate-mind-map", contentId],
    mutationFn: async () => {
      const { mindMap, mindMapRaw, error } = await generateMindMap({
        transcription: rawTranscription,
      });
      return {
        mindMap: mindMap,
        mindMapRaw: mindMapRaw,
      };
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log("data", data);
      setMindMapToGenerate(data.mindMapRaw);
      toast.success("Mind map generated successfully");
    },
  });
}
