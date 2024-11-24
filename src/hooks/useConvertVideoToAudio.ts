import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useState } from "react";
import {toast} from "react-hot-toast";

export const useConvertVideoToAudio = (ffmpeg: FFmpeg) => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    ffmpeg.on('log', ({ message }) => {
        console.log("[MESSAGE LOG]",message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    const isLoaded = await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    return isLoaded;
  }
  

  async function convertVideoToAudio(video: File): Promise<File | null> {
    setLoading(true);
    try {
      if (!video) {
        toast.error("No video file selected");
        return null;
      }

      await load()
  
      // const IsFFmpegLoaded = await ffmpeg.load({
      //   coreURL,
      //   wasmURL,
      // // });
      // if(!IsFFmpegLoaded){
      //   toast.error("FFmpeg not loaded");
      //   return null;
      // }

      await ffmpeg.writeFile("input.mp4", await fetchFile(video));
  
      ffmpeg.on("progress", (progress) => {
        setProgress(Math.round(progress.progress * 100));
      });
  
      const convert = await ffmpeg.exec([
        "-i", 
        "input.mp4", 
        "-map", 
        "0:a", 
        "-b:a", 
        "20k", 
        "-acodec", 
        "libmp3lame", 
        "output.mp3",
      ]);

      console.log(convert);     
  
      const data = await ffmpeg.readFile("output.mp3");
      const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
      return new File([audioFileBlob], "audio.mp3", { type: "audio/mpeg" });
  
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Error converting video to audio.");
      return null;
    }finally{
      setLoading(false);
    }
  }
  

  return {
    convertVideoToAudio,
    progress,
    load,
    loadingFFMPEG: loading
  };
};
