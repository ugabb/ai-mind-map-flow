import type { User } from "next-auth";
import { ImSpinner8 } from "react-icons/im";
import { PiPaperPlaneTilt } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContent } from "../ContentPage/hooks/useContent";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type GenerateMindMapModalProps = {
  open?: boolean;
  onClose?: () => void;
  currentUser: User | undefined;
  title?: string;
};

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
    <Dialog onOpenChange={handleClose} open={open}>
      <DialogContent className="bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Upload a video to generate a mind map. Max file size is 25MB.
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto flex w-full flex-col items-center justify-center gap-5 p-5">
          <Input
            className="w-full"
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="URL"
            type="text"
          />

          {isGeneratingContent && (
            <div className="flex items-center gap-2 text-primary">
              <ImSpinner8 className="size-4 animate-spin" />
              <p className="text-sm">Loading transcription...</p>
            </div>
          )}
        </div>

        <Button
          className="mx-auto w-fit bg-primary"
          disabled={isGeneratingContent}
          onClick={() => generateContent({ url })}
        >
          {isGeneratingContent && (
            <ImSpinner8 className="size-5 animate-spin" />
          )}
          {!isGeneratingContent && (
            <>
              {isGeneratingContent
                ? "Loading Transcription..."
                : "Generate Mind Map"}
              <PiPaperPlaneTilt className="ml-2 size-5 text-white" />
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
