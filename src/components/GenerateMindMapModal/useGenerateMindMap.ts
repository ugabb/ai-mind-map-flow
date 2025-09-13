import { useRef, useState } from "react";
import { useConvertVideoToAudio } from "@/hooks/useConvertVideoToAudio";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { getAudioTranscript } from "@/services/mind-map/getAudioTranscript";
import { generateMindMap } from "@/services/mind-map/generateMindMap";
import { useNodeStore } from "@/store/NodeStore";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/axios";
import toast from "react-hot-toast";
import { saveMindMap, SaveMindRequest } from "@/services/mind-map/saveMindMap";
import { User } from "next-auth";
import { useGetTranscriptionYouTube } from "@/services/hooks/use-get-transcription-youtube";

export type UploadType = "YTB_URL" | "SYSTEM_FILE";

export function useGenerateMindMap(currentUser: User | undefined) {
  const [video, setVideo] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<UploadType>("YTB_URL");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setMindMapToGenerate, setMindMapLoadingRequest } = useNodeStore();

  const ffmpeg = useRef<FFmpeg>(new FFmpeg());

  const { convertVideoToAudio, progress, loadingFFMPEG } =
    useConvertVideoToAudio(ffmpeg.current);

  const router = useRouter();

  const { mutateAsync: downloadYtbVideoFn, isPending } = useMutation<
    File,
    unknown,
    string
  >({
    mutationKey: ["downloadYtbVideo"],
    mutationFn: async (url: string) => {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/convert-to-audio`,
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      return new File([response.data], "audio.mp3", { type: "audio/mpeg" });
    },
    onError: (error) => {
      console.error("Error converting video to audio", error);
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: saveMindMapFn } = useMutation({
    mutationKey: ["save-mindMap"],
    mutationFn: (data: SaveMindRequest) => saveMindMap(data),
    onError: () => toast.error("Error while saving Mind Map"),
    onSuccess: () => {
      toast.success("Mind Map saved successfully");
    },
  });

  const {
    data: transcriptionResponse,
    isLoading: isLoadingTranscription,
    error: transcriptionError,
  } = useGetTranscriptionYouTube({
    url,
  });

  const handleConvert = async (): Promise<File | null | undefined> => {
    try {
      if (uploadType === "SYSTEM_FILE" && video) {
        return await convertVideoToAudio(video);
      }

      if (uploadType === "YTB_URL" && url) {
        toast.error("Downloading from Youtube is not supported anymore.");
        return null;
      }
    } catch (e) {
      console.error("Error during conversion:", e);
      setError("An error occurred while processing the video.");
    }
  };

  const handleGenerateMindMap = async () => {
    setMindMapLoadingRequest(true);
    setError(null);
    setIsLoading(true);

    try {
      // Check if transcription is still loading
      if (isLoadingTranscription) {
        setError("Transcription is still loading. Please wait...");
        setMindMapLoadingRequest(false);
        setIsLoading(false);
        return;
      }

      // Check for transcription errors
      if (transcriptionError) {
        setError(
          "Failed to get transcription from YouTube. Please check the URL and try again."
        );
        setMindMapLoadingRequest(false);
        setIsLoading(false);
        return;
      }

      const transcription = transcriptionResponse?.transcriptionRaw || "";
      console.debug("Transcription:", transcription);
      if (!transcription) {
        setError("Transcription is not available or empty.");
        setMindMapLoadingRequest(false);
        setIsLoading(false);
        return;
      }

      const mindMapJSON = await generateMindMap(transcription);
      console.debug("mindMapJSON:", mindMapJSON);

      if (!mindMapJSON) {
        setError("Failed to generate mind map from transcription.");
        setMindMapLoadingRequest(false);
        setIsLoading(false);
        return;
      }

      // save mind map
      const mindmap = await saveMindMapFn({
        title: "Untitled",
        mindMap: mindMapJSON,
        userId: currentUser?.id as string,
      });

      console.debug("Saved mindmap:", mindmap);

      queryClient.invalidateQueries({
        queryKey: ["mindmaps", currentUser?.id],
      });

      if (mindmap) {
        setMindMapToGenerate(mindMapJSON);
        setMindMapLoadingRequest(false);
        // Redirect to study/content/[id] instead of mind-map/[id]
        router.push(`/study/content/${mindmap.id}`);
      }
    } catch (e) {
      console.error("Error generating mind map:", e);
      setError("An error occurred while generating the mind map.");
      setMindMapLoadingRequest(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setUrl(url);
    validateUrl(url);
  };

  const validateUrl = (url: string) => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      setIsUrlValid(false);
      return;
    }
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    setIsUrlValid(youtubeRegex.test(url.trim()));
  };

  const resetForm = () => {
    setVideo(null);
    setUrl("");
    setIsUrlValid(false);
    setError(null);
    setIsLoading(false);
  };

  const setUploadTypeAndReset = (type: UploadType) => {
    setUploadType(type);
    setUrl("");
    setVideo(null);
  };

  return {
    // State
    video,
    url,
    isUrlValid,
    uploadType,
    error,
    isLoading,
    progress,
    loadingFFMPEG,
    isLoadingTranscription,
    transcriptionError,
    transcriptionResponse,
    isPending,

    // Actions
    setVideo,
    handleUrlChange,
    setUploadTypeAndReset,
    handleGenerateMindMap,
    resetForm,
  };
}
