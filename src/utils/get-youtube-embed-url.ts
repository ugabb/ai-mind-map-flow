import { getVideoIdYouTube } from "./get-video-id-youtube";

/**
 * Converts a YouTube URL to an embed URL that can be used in an iframe
 * @param url - The YouTube URL (any format: watch, youtu.be, embed, etc.)
 * @returns The embed URL or null if the URL is invalid
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url || typeof url !== "string" || url.trim() === "") return null;

  const videoId = getVideoIdYouTube(url);
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
}
