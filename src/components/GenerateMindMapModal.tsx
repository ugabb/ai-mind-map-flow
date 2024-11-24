import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/axios";
import { ImSpinner8 } from "react-icons/im";
import {
  PiPaperPlaneTilt
} from "react-icons/pi";
import toast from "react-hot-toast";
import { saveMindMap, SaveMindRequest } from "@/services/mind-map/saveMindMap";
import { User } from "next-auth";

interface GenerateMindMapModalProps {
  open?: boolean;
  onClose?: () => void;
  currentUser: User | undefined;
}

export const GenerateMindMapModal = ({
  open,
  onClose,
  currentUser,
}: GenerateMindMapModalProps) => {
  const [video, setVideo] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<"YTB_URL" | "SYSTEM_FILE">(
    "YTB_URL"
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setMindMapToGenerate, setMindMapLoadingRequest } = useNodeStore();

  const ffmpeg = useRef<FFmpeg>(new FFmpeg());

  const { convertVideoToAudio, progress, loadingFFMPEG } = useConvertVideoToAudio(
    ffmpeg.current
  );

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

  const handleConvert = async (): Promise<File | null | undefined> => {
    try {
      if (uploadType === "SYSTEM_FILE" && video) {
        // if (video.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        //   setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
        //   return;
        // }
        return await convertVideoToAudio(video);
      }

      if (uploadType === "YTB_URL" && url) {
        return await downloadYtbVideoFn(url);
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

    const file = await handleConvert();
    if (!file) {
      setMindMapLoadingRequest(false);
      return;
    }

    try {
      const { transcription, status } = await getAudioTranscript(file);
      if (status !== 200) {
        setError("Failed to transcribe audio.");
        setMindMapLoadingRequest(false);
        return;
      }

      const mindMapJSON = await generateMindMap(transcription);

      // save mind map
      const mindmap = await saveMindMapFn({
        title: "Untitled",
        mindMap: mindMapJSON,
        userId: currentUser?.id as string,
      });

      queryClient.invalidateQueries({
        queryKey: ["mindmaps", currentUser?.id],
      });

      if(mindmap){
        setMindMapToGenerate(mindMapJSON);
        setMindMapLoadingRequest(false);
        router.push(`/mind-map/${mindmap.id}`);
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
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    setIsUrlValid(youtubeRegex.test(url));
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
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

          {progress > 0 && (
            <Progress value={progress} max={100} className="h-3" />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <Button
          onClick={handleGenerateMindMap}
          disabled={
            (!isUrlValid && uploadType === "YTB_URL") ||
            (!video && uploadType === "SYSTEM_FILE") ||
            isPending ||
            loadingFFMPEG
          }
          className="bg-indigo-500 w-fit mx-auto"
        >
          {isLoading && <ImSpinner8 className="animate-spin size-5" />}
          {!isLoading && (
            <>
              Generate Mind Map
              <PiPaperPlaneTilt className="ml-2 text-white size-5" />
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
