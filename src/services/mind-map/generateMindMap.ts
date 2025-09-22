import { api } from "../axios";

interface GenerateMindMapProps {
  transcription: string;
}

interface GenerateMindMapResponse {
  mindMap: any;
  mindMapRaw: string;
  error?: any;
}

export async function generateMindMap(
  props: GenerateMindMapProps
): Promise<GenerateMindMapResponse> {
  try {
    const { data } = await api.post<GenerateMindMapResponse>(`/mindmap`, {
      transcription: props.transcription,
    });

    return data;
  } catch (error) {
    console.error(error);
    return {
      error: error,
      mindMap: null,
      mindMapRaw: "",
    };
  }
}
