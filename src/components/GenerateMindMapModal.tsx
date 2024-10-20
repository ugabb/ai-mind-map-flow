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
import { useRef, useState } from "react";
import { useConvertVideoToAudio } from "@/hooks/useConvertVideoToAudio";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { LuTrash2 } from "react-icons/lu";
import { getAudioTranscript } from "@/services/mind-map/getAudioTranscript";
import { generateMindMap } from "@/services/mind-map/generateMindMap";
import { useNodeStore } from "@/store/NodeStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface GenerateMindMapModalProps {
  open?: boolean;
  onClose?: () => void;
}

export const GenerateMindMapModal = ({
  open,
  onClose,
}: GenerateMindMapModalProps) => {
  const [convertedAudio, setConvertedAudio] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<"YTB_URL" | "SYSTEM_FILE">(
    "YTB_URL"
  );

  const { setMindMapToGenerate, setMindMapLoadingRequest } = useNodeStore();

  const ffmpeg = useRef<FFmpeg>(new FFmpeg());

  const { convertVideoToAudio, progress } = useConvertVideoToAudio(
    ffmpeg.current
  );

  const router = useRouter();

  const { mutateAsync: downloadYtbVideoFn, isPending } = useMutation<File, unknown, string>({
    mutationKey: ["downloadYtbVideo"],
    mutationFn: async (url: string) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/convert-to-audio`,
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: 'blob', 
        }
      )
      return new File([response.data], "audio.mp3", { type: "audio/mpeg" });
    },
    onError: (error) => {
      console.error("Error converting video to audio", error);
    },
  });

  const handleConvert = async () => {
    if (!video && !url) return;
    if (video) {
      const convertedAudio = await convertVideoToAudio(video);
      setConvertedAudio(convertedAudio);
    }

    if (url) {
      const file = await downloadYtbVideoFn(url);
      console.log("data", file);
      setConvertedAudio(file);
    }
  };

  const handleGenerateMindMap = async () => {
    if (!convertedAudio) return;
    setMindMapLoadingRequest(true);

    const { transcription, status } = await getAudioTranscript(convertedAudio);
    if (status !== 200) return;
    const mindMap = await generateMindMap(transcription);

    setMindMapToGenerate(mindMap);
    setMindMapLoadingRequest(false);
    router.push(`/mind-map/unsaved`);
  };

  const handleUrlChange = (url: string) => {
    setUrl(url);
    validateUrl(url);
  };

  const validateUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    setIsUrlValid(youtubeRegex.test(url));
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger>Generate Mind Map</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Mind Map</DialogTitle>
          <DialogDescription>
            Upload a video to generate a mind map. Max file size is 25MB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center mx-auto gap-5 w-full p-5">
          <Select
            onValueChange={(value: "YTB_URL" | "SYSTEM_FILE") => {
              setUploadType(value);
              setUrl("");
              setVideo(null);
            }}
            defaultValue="YTB_URL"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose the type of the upload" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YTB_URL">Youtube URL</SelectItem>
              <SelectItem value="SYSTEM_FILE">System File</SelectItem>
            </SelectContent>
          </Select>

          {video ? (
            <div className="flex gap-5 items-center">
              <p>Selected video: {video.name}</p>
              <Button onClick={() => setVideo(null)}>
                <LuTrash2 className="size-5 text-white" />
              </Button>
            </div>
          ) : (
            <div className="w-full">
              {uploadType === "YTB_URL" && (
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Youtube URL"
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
              )}
              {uploadType === "SYSTEM_FILE" && (
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files?.[0] || null)}
                  className="w-full"
                />
              )}
            </div>
          )}
          <Button
            onClick={handleConvert}
            disabled={
              (!isUrlValid && uploadType === "YTB_URL") ||
              (!video && uploadType === "SYSTEM_FILE")
            }
          >
            Convert
            {isPending && <ImSpinner8 className="animate-spin ml-2" />}
          </Button>

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
