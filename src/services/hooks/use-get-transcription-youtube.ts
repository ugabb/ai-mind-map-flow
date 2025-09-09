import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { api } from "../axios";
import { getVideoIdYouTube } from "@/utils/get-video-id-youtube";

interface YouTubeTranscriptRequest {
  url: string;
  lang?: string;
}

interface TranscriptChunk {
  text: string;
  offset: number;
  duration: number;
  lang: string;
}
interface Transcript {
  content: TranscriptChunk[] | string;
  lang: string;
  availableLangs: string[];
}

export interface YoutubeTranscriptionResult {
  transcript: Transcript;
  transcriptionRaw: string;
}

// Helper function to validate YouTube URL
const isValidYouTubeUrl = (url: string): boolean => {
  if (!url || typeof url !== "string" || url.trim() === "") return false;

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url.trim());
};

export function useGetTranscriptionYouTube(props: YouTubeTranscriptRequest) {
  // Memoize URL validation and video ID extraction to prevent unnecessary recalculations
  const { isValidUrl, videoId } = useMemo(() => {
    const trimmedUrl = props.url?.trim() || "";
    const valid = isValidYouTubeUrl(trimmedUrl);
    const id = valid ? getVideoIdYouTube(trimmedUrl) : null;

    return {
      isValidUrl: valid,
      videoId: id,
    };
  }, [props.url]);

  // Only enable the query when we have a valid URL and valid video ID
  const shouldFetch = isValidUrl && !!videoId;

  return useQuery({
    queryKey: ["get-transcription-youtube", props.url, props.lang],
    queryFn: async () => {
      if (!videoId) {
        throw new Error("Invalid YouTube video ID");
      }

      const { data } = await api.get<YoutubeTranscriptionResult>(
        `/youtube/${videoId}/transcript/${props.lang || "en"}`
      );

      return data;
    },
    enabled: shouldFetch,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      // Don't retry if it's a 404 (video not found) or 403 (access denied)
      if (error?.response?.status === 404 || error?.response?.status === 403) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}
