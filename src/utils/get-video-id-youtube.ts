export function getVideoIdYouTube(url: string): string | null {
  if (!url || typeof url !== "string" || url.trim() === "") return null;

  try {
    const trimmedUrl = url.trim();

    // Handle different YouTube URL formats
    // 1. Standard format: https://www.youtube.com/watch?v=VIDEO_ID
    // 2. Short format: https://youtu.be/VIDEO_ID
    // 3. Embedded format: https://www.youtube.com/embed/VIDEO_ID
    // 4. Mobile format: https://m.youtube.com/watch?v=VIDEO_ID

    // YouTube short URL format (youtu.be)
    const shortUrlMatch = trimmedUrl.match(
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (shortUrlMatch) {
      return shortUrlMatch[1];
    }

    // YouTube embed URL format
    const embedMatch = trimmedUrl.match(
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );
    if (embedMatch) {
      return embedMatch[1];
    }

    // Standard YouTube URL format with v= parameter
    const standardMatch = trimmedUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (standardMatch) {
      return standardMatch[1];
    }

    // Fallback to original logic with proper error handling
    const splited = trimmedUrl.split("v=");
    if (splited.length > 1) {
      const splitedAgain = splited[1].split("&");
      const videoId = splitedAgain[0];

      // Validate that the video ID looks correct (11 characters)
      if (
        videoId &&
        videoId.length === 11 &&
        /^[a-zA-Z0-9_-]+$/.test(videoId)
      ) {
        return videoId;
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting YouTube video ID:", error);
    return null;
  }
}
