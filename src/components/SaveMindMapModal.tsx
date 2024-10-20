"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef } from "react";
import { LuSave } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { ImSpinner8 } from "react-icons/im";
import toast from "react-hot-toast";

interface SaveMindMapModalProps {
  onSave: (title: string) => Promise<void>;
  isPending: boolean;
}

export const SaveMindMapModal = (props: SaveMindMapModalProps) => {
  const { onSave, isPending } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-indigo-200 p-2 rounded-xl">
          <LuSave />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Mind Map</DialogTitle>
        </DialogHeader>
        <Input placeholder="Title" ref={titleRef} />
        <Button
          onClick={() => {
            onSave(titleRef.current ? titleRef.current.value : "");
          }}
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
