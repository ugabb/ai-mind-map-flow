import {
    useReactFlow,
    getNodesBounds,
    getViewportForBounds
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { zinc } from "tailwindcss/colors";
import { PiArrowDown } from "react-icons/pi";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
  

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 3840;
const imageHeight = 2160;

function Export() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      1
    );

    const reactFlow = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;

    if (!reactFlow) return;

    toPng(reactFlow, {
      backgroundColor: zinc[50],
      width: imageWidth,
      height: imageHeight,
      pixelRatio: 2,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <PiArrowDown
            onClick={onClick}
            className="size-24 translate-y-4 hover:translate-y-1 transition-transform cursor-pointer"
          />
        </TooltipTrigger>
        <TooltipContent className="bg-indigo-500">
          <p>Download Mind Map</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Export;
