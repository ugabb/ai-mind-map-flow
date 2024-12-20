"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef } from "react";
import { LuSave } from "react-icons/lu";
import { ImSpinner8 } from "react-icons/im";

interface SaveMindMapModalProps {
  onSave: (title: string) => Promise<void>;
  isPending: boolean;
  title?: string;
}

export const SaveMindMapModal = (props: SaveMindMapModalProps) => {
  const { onSave, isPending, title } = props;
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <DialogTrigger>
            <TooltipTrigger>
              <LuSave className="w-24 h-24 translate-y-8 rounded-md hover:translate-y-5 transition-transform cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="bg-indigo-500">
              <p>Save Mind Map</p>
            </TooltipContent>
          </DialogTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Mind Map</DialogTitle>
        </DialogHeader>
        <Input placeholder="Title" ref={titleRef} defaultValue={title ? title : ''} />
        <Button
          onClick={() => {
            onSave(titleRef.current ? titleRef.current.value : "");
          }}
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          {isPending ? (
            <ImSpinner8 className="w-5 h-5 text-indigo-500 animate-spin z-50" />
          ) : (
            "Save"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
