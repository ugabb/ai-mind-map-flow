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
import { useContent } from "../ContentPage/hooks/useContent";
import { User } from "next-auth";

interface GenerateMindMapModalProps {
  open?: boolean;
  onClose?: () => void;
  currentUser: User | undefined;
  title?: string;
}

export const GenerateContentUrlModal = ({
  open,
  onClose,
  currentUser,
  title = "Paste Content URL",
}: GenerateMindMapModalProps) => {
  const { url, isGeneratingContent, handleUrlChange, generateContent } =
    useContent(currentUser?.id as string);

  const handleClose = () => {
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
          <Input
            type="text"
            className="w-full"
            placeholder="URL"
            onChange={(e) => handleUrlChange(e.target.value)}
          />

          {isGeneratingContent && (
            <div className="flex items-center gap-2 text-primary">
              <ImSpinner8 className="animate-spin size-4" />
              <p className="text-sm">Loading transcription...</p>
            </div>
          )}
        </div>

        <Button
          onClick={() => generateContent({ url })}
          disabled={isGeneratingContent}
          className="bg-primary w-fit mx-auto"
        >
          {isGeneratingContent && (
            <ImSpinner8 className="animate-spin size-5" />
          )}
          {!isGeneratingContent && (
            <>
              {isGeneratingContent
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
