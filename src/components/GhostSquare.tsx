import { memo, useMemo } from "react";

interface GhostSquareProps {
  width: number;
  height: number;
  direction?: string;
}

const GhostSquare_ = (props: GhostSquareProps) => {
  const { width, height, direction } = props;
  const distance = useMemo(() => {
    const DISTANCE = 100;
    if (direction === "left" || direction === "right") {
      return width + DISTANCE;
    } else {
      return height + DISTANCE;
    }
  }, [direction, height, width]);

  console.log(width, height, distance);
  return (
    <div
      className={`
            bg-indigo-500/20 
            rounded  
            min-w-[${width ? width : 200}px] 
            min-h-[${height ? height : 200}px]
            w-[${width}px]
            h-[${height}px]
        `}
      style={{
        position: "absolute",
        ...(direction === "right" && { right: `-${distance}px` }),
        ...(direction === "left" && { left: `-${distance}px` }),
        ...(direction === "top" && { top: `-${distance}px` }),
        ...(direction === "bottom" && { bottom: `-${distance}px` }),
        pointerEvents: "none", // Allow clicks to pass through
        zIndex: 1, // Ensure it's above the background
      }}
    />
  );
};

export const GhostSquare = memo(GhostSquare_);
