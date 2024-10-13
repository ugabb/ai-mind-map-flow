import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useConvertVideoToAudio } from "@/hooks/useConvertVideoToAudio";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { LuTrash2 } from "react-icons/lu";
import { getAudioTranscript } from "@/services/getAudioTranscript";
import { generateMindMap } from "@/services/generateMindMap";
import { useNodeStore } from "@/store/NodeStore";

export const GenerateMindMapModal = () => {
  const [convertedAudio, setConvertedAudio] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const { setMindMap, setMindMapLoadingRequest } = useNodeStore();

  const ffmpeg = useRef<FFmpeg>(new FFmpeg());

  const { convertVideoToAudio, progress } = useConvertVideoToAudio(
    ffmpeg.current
  );

  const handleConvert = async () => {
    if (video) {
      const convertedAudio = await convertVideoToAudio(video);
      setConvertedAudio(convertedAudio);
    }
  };

  const handleGenerateMindMap = async () => {
    if (!convertedAudio) return;
    setMindMapLoadingRequest(true);

    const { transcription, status } = await getAudioTranscript(convertedAudio);
    if (status !== 200) return;
    const mindMap = await generateMindMap(transcription);
    setMindMap(mindMap);
    setMindMapLoadingRequest(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        Generate Mind Map 
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Mind Map</DialogTitle>
          <DialogDescription>
            Upload a video to generate a mind map. Max file size is 25MB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center mx-auto gap-5">
          {video ? (
            <div className="flex gap-5 items-center">
              <p>Selected video: {video.name}</p>
              <Button onClick={() => setVideo(null)}>
                <LuTrash2 className="size-5 text-white" />
              </Button>
            </div>
          ) : (
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
            />
          )}
          <Button onClick={handleConvert}>Convert</Button>

          {progress > 0 && (
            <Progress value={progress} max={100} className="h-3" />
          )}
        </div>
        {convertedAudio && (
          <Button onClick={handleGenerateMindMap}>Generate Mind Map</Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
