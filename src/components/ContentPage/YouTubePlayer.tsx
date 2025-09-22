"use client";

import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { getYouTubeEmbedUrl } from "@/utils/get-youtube-embed-url";

interface YouTubePlayerProps {
  sourceUrl: string;
  title: string;
}

export interface YouTubePlayerRef {
  jumpToTime: (timeInSeconds: number) => void;
}

export const YouTubePlayer = forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
  ({ sourceUrl, title }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [currentUrl, setCurrentUrl] = useState<string>("");

    // Convert YouTube URL to embed URL with initial parameters
    const getEmbedUrlWithTime = (timeInSeconds: number = 0) => {
      if (!sourceUrl) return null;

      const baseEmbedUrl = getYouTubeEmbedUrl(sourceUrl);
      if (!baseEmbedUrl) return null;

      return `${baseEmbedUrl}?start=${timeInSeconds}&autoplay=1&enablejsapi=1`;
    };

    // Initialize with the embed URL
    useState(() => {
      const embedUrl = getEmbedUrlWithTime(0);
      if (embedUrl) {
        setCurrentUrl(embedUrl);
      }
    });

    // Handle time jump by updating iframe src with proper parameters
    const jumpToTime = (timeInSeconds: number) => {
      const newUrl = getEmbedUrlWithTime(timeInSeconds);
      if (newUrl && iframeRef.current) {
        setCurrentUrl(newUrl);
        iframeRef.current.src = newUrl;
      }
    };

    // Expose jumpToTime function to parent component
    useImperativeHandle(ref, () => ({
      jumpToTime,
    }));

    if (!currentUrl) {
      return null;
    }

    return (
      <div className="w-full">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full aspect-video rounded-lg"
        />
      </div>
    );
  }
);

YouTubePlayer.displayName = "YouTubePlayer";
