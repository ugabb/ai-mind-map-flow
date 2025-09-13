import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { LuTrash2 } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImSpinner8 } from "react-icons/im";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { useGenerateMindMap } from "./useGenerateMindMap";
import { User } from "next-auth";

interface GenerateMindMapModalProps {
  open?: boolean;
  onClose?: () => void;
  currentUser: User | undefined;
  title?: string;
  defaultUploadType?: "YTB_URL" | "SYSTEM_FILE";
}

export const GenerateMindMapModal = ({
  open,
  onClose,
  currentUser,
  title = "Generate Mind Map",
  defaultUploadType = "YTB_URL",
}: GenerateMindMapModalProps) => {
  const {
    video,
    url,
    isUrlValid,
    uploadType,
    error,
    isLoading,
    progress,
    loadingFFMPEG,
    isLoadingTranscription,
    transcriptionError,
    transcriptionResponse,
    isPending,
    setVideo,
    handleUrlChange,
    setUploadTypeAndReset,
    handleGenerateMindMap,
    resetForm,
  } = useGenerateMindMap(currentUser);

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="backdrop-blur-sm bg-background/95">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Upload a video to generate a mind map. Max file size is 25MB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center mx-auto gap-5 w-full p-5">
          <Select
            onValueChange={(value: "YTB_URL" | "SYSTEM_FILE") => {
              setUploadTypeAndReset(value);
            }}
            defaultValue={defaultUploadType}
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

          {uploadType === "YTB_URL" && isUrlValid && isLoadingTranscription && (
            <div className="flex items-center gap-2 text-primary">
              <ImSpinner8 className="animate-spin size-4" />
              <p className="text-sm">Loading transcription...</p>
            </div>
          )}

          {uploadType === "YTB_URL" && transcriptionError && (
            <p className="text-destructive text-sm">
              Failed to load transcription. Please check the YouTube URL.
            </p>
          )}

          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <Button
          onClick={handleGenerateMindMap}
          disabled={
            (!isUrlValid && uploadType === "YTB_URL") ||
            (!video && uploadType === "SYSTEM_FILE") ||
            isPending ||
            loadingFFMPEG ||
            isLoadingTranscription ||
            (uploadType === "YTB_URL" &&
              !transcriptionResponse?.transcriptionRaw)
          }
          className="bg-primary w-fit mx-auto"
        >
          {(isLoading || isLoadingTranscription) && (
            <ImSpinner8 className="animate-spin size-5" />
          )}
          {!(isLoading || isLoadingTranscription) && (
            <>
              {isLoadingTranscription
                ? "Loading Transcription..."
                : "Generate Mind Map"}
              <PiPaperPlaneTilt className="ml-2 text-white size-5" />
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
