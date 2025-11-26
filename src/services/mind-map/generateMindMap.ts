import { api } from "../axios";

type GenerateMindMapProps = {
  transcription: string;
};

type GenerateMindMapResponse = {
  mindMap: any;
  mindMapRaw: string;
  error?: any;
};

export async function generateMindMap(
  props: GenerateMindMapProps
): Promise<GenerateMindMapResponse> {
  try {
    const { data } = await api.post<GenerateMindMapResponse>("/mindmap", {
      transcription: props.transcription,
    });

    return data;
  } catch (error) {
    console.error(error);
    return {
      error,
      mindMap: null,
      mindMapRaw: "",
    };
  }
}
