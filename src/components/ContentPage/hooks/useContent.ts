import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/services/axios";

export type UploadType = "YTB_URL" | "SYSTEM_FILE";

export function useContent(userId: string) {
  const [url, setUrl] = useState<string>("");

  // const { setMindMapToGenerate, setMindMapLoadingRequest } = useNodeStore();

  const router = useRouter();

  const { mutateAsync: generateContent, isPending: isGeneratingContent } =
    useMutation({
      mutationKey: ["generate-content"],
      mutationFn: async (data: { url: string }) => {
        const isYoutubeUrl = validateIfIsYoutubeUrl(data.url);

        if (!isYoutubeUrl) {
          throw new Error("Invalid YouTube URL");
        }
        const { data: contentData } = await api.post("/content", {
          sourceUrl: data.url,
          userId,
        });
        return {
          title: contentData.title,
          id: contentData.id,
        };
      },
      onError: (error) => toast.error(error.message),
      onSuccess: (data) => {
        toast.success("Url Uploaded Successfully");
        router.push(`/study/content/${data.id}`);
      },
    });

  const validateIfIsYoutubeUrl = (url: string): boolean => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return false;
    }
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const isYoutubeUrl = youtubeRegex.test(url.trim());
    return isYoutubeUrl;
  };

  const handleUrlChange = (url: string) => {
    setUrl(url);
  };

  return {
    url,
    isGeneratingContent,
    handleUrlChange,
    generateContent,
  };
}
