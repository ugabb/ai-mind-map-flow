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
}

export const SaveMindMapModal = (props: SaveMindMapModalProps) => {
  const { onSave } = props;
  const titleRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: saveMindMapMutation, isPending } = useMutation({
    mutationKey: ["save-mindMap"],
    mutationFn: () => onSave(titleRef.current ? titleRef.current.value : ""),
    onSuccess() {
      toast.success("Mind Map saved successfully");
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
          Save Mind Map
          <LuSave />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Mind Map</DialogTitle>
        </DialogHeader>
        <Input placeholder="Title" ref={titleRef} />
        <Button
          onClick={() => {
            saveMindMapMutation();
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
