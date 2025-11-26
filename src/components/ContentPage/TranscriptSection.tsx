"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Transcription } from "@/types/content";
import type { YouTubePlayerRef } from "./YouTubePlayer";

// Transcript component with ghost variant styling
function TranscriptBox({
  children,
  className = "",
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  return (
    <div
      className={`cursor-pointer rounded-md p-4 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

type TranscriptSectionProps = {
  transcription: Transcription;
  youtubePlayerRef: React.RefObject<YouTubePlayerRef>;
};

export function TranscriptSection({
  transcription,
  youtubePlayerRef,
}: TranscriptSectionProps) {
  // Calculate transcription time in [HH:MM:SS] format
  const calculateTranscriptionTime = (offset: number): string => {
    // Convert offset from milliseconds to seconds
    const offsetInSeconds = offset / 1000;
    const hours = Math.floor(offsetInSeconds / 3600);
    const minutes = Math.floor((offsetInSeconds % 3600) / 60);
    const seconds = Math.floor(offsetInSeconds % 60);

    return `[${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}]`;
  };

  // Function to concatenate 3 chunks into one larger transcript box
  const concatChunks = (chunks: typeof transcription.chunks) => {
    const groupedChunks = [];

    for (let i = 0; i < chunks.length; i += 3) {
      const group = chunks.slice(i, i + 3);
      groupedChunks.push(group);
    }

    return groupedChunks;
  };

  // Handle click to jump to specific time in YouTube video
  const handleTranscriptClick = (offset: number) => {
    if (youtubePlayerRef.current) {
      // Convert offset from milliseconds to seconds
      const timeInSeconds = Math.floor(offset / 1000);
      youtubePlayerRef.current.jumpToTime(timeInSeconds);
    }
  };

  return (
    <div className="min-h-0 flex-1">
      <h3 className="mb-3 font-semibold text-foreground text-lg">
        Transcription
      </h3>
      <ScrollArea className="h-full">
        <div className="space-y-2 text-muted-foreground leading-relaxed">
          {concatChunks(transcription.chunks).map((chunk) => {
            const firstChunk = chunk[0];
            const combinedText = chunk.map((chunk) => chunk.text).join(" ");
            return (
              <TranscriptBox
                key={firstChunk.id}
                onClick={() => handleTranscriptClick(firstChunk.offset)}
              >
                <p>
                  <span className="font-mono text-muted-foreground text-xs">
                    {calculateTranscriptionTime(firstChunk.offset)}
                  </span>{" "}
                  {combinedText}
                </p>
              </TranscriptBox>
            );
          })}
          {/* Placeholder content */}
          <div className="mt-6 border-border border-t py-8 text-center text-muted-foreground italic">
            More transcription content will be loaded here...
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
