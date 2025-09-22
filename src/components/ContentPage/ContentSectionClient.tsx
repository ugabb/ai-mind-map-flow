"use client";

import { useRef } from "react";
import type { Content } from "@/types/content";
import type { YouTubePlayerRef } from "./YouTubePlayer";
import { YouTubePlayer } from "./YouTubePlayer";
import { TranscriptSection } from "./TranscriptSection";

interface ContentSectionClientProps {
  content: Content;
}

export function ContentSectionClient({ content }: ContentSectionClientProps) {
  const youtubePlayerRef = useRef<YouTubePlayerRef>(null);

  return (
    <div className="flex flex-col gap-6 h-full px-2">
      {/* YouTube Video Section */}
      <YouTubePlayer
        ref={youtubePlayerRef}
        sourceUrl={content.sourceUrl}
        title={content.title}
      />

      {/* Transcription Section */}
      <TranscriptSection
        transcription={content.transcription}
        youtubePlayerRef={youtubePlayerRef}
      />
    </div>
  );
}
