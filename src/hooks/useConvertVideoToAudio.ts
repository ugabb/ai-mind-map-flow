import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useState } from "react";
import {toast} from "react-hot-toast";

export const useConvertVideoToAudio = (ffmpeg: FFmpeg) => {
  const [progress, setProgress] = useState<number>(0);

  async function convertVideoToAudio(video: File): Promise<File | null> {
    if(!video) {
      toast.error("No video file selected");
      return null
    };

    await ffmpeg.load();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    ffmpeg.on("progress", (progress) => {
      setProgress(Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i", // Input file flag
      "input.mp4", // Input file name
      "-map", // Select stream(s) flag
      "0:a", // Select the first audio stream from the input file
      "-b:a", // Set audio bitrate flag
      "20k", // Audio bitrate value (20 kilobits per second)
      "-acodec", // Set audio codec flag
      "libmp3lame", // Audio codec to use (libmp3lame for MP3 encoding)
      "output.mp3", // Output file name
    ]);

    const data = await ffmpeg.readFile("output.mp3");
    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });

    return audioFile;
  }

  return {
    convertVideoToAudio,
    progress,
  };
};
