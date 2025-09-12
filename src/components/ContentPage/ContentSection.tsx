import { ScrollArea } from "@/components/ui/scroll-area";

// Transcript component with ghost variant styling
function TranscriptBox({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={`rounded-md p-4 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContentSection() {
  return (
    <div className="flex flex-col gap-6 h-full px-2">
      {/* YouTube Video Section */}
      <div className="w-full">
        <iframe
          src="https://www.youtube.com/embed/fwjk2YF-HBM"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full aspect-video rounded-lg"
        />
      </div>

      {/* Transcription Section */}
      <div className="flex-1 min-h-0">
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Transcription
        </h3>
        <ScrollArea className="h-full">
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <TranscriptBox>
              <p>
                <span className="text-muted-foreground text-xs font-mono">
                  [00:00:00]
                </span>{" "}
                This is where the transcription of the video content will
                appear. The transcription will be automatically generated and
                displayed here for easy reading and reference.
              </p>
            </TranscriptBox>

            <TranscriptBox>
              <p>
                <span className="text-muted-foreground text-xs font-mono">
                  [00:00:15]
                </span>{" "}
                Users can scroll through the transcription while watching the
                video to better understand the content.
              </p>
            </TranscriptBox>

            <TranscriptBox>
              <p>
                <span className="text-muted-foreground text-xs font-mono">
                  [00:00:30]
                </span>{" "}
                The transcription includes timestamps to help synchronize with
                the video playback.
              </p>
            </TranscriptBox>

            <TranscriptBox>
              <p>
                <span className="text-muted-foreground text-xs font-mono">
                  [00:01:00]
                </span>{" "}
                Additional transcription content continues here with proper
                formatting and timestamps for easy navigation.
              </p>
            </TranscriptBox>

            <TranscriptBox>
              <p>
                <span className="text-muted-foreground text-xs font-mono">
                  [00:01:30]
                </span>{" "}
                The ghost variant styling provides a clean, minimal appearance
                that focuses attention on the content while maintaining
                readability.
              </p>
            </TranscriptBox>

            {/* Placeholder content */}
            <div className="text-muted-foreground italic text-center py-8 border-t border-border mt-6">
              More transcription content will be loaded here...
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
