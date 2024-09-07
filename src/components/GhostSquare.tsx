import { useMemo } from "react";

interface GhostSquareProps {
    width: number;
    height: number;
    direction: string;
}


const GhostSquare = (props: GhostSquareProps) => {
    const {width, height, direction} = props
    const distance = useMemo(() => {
        const DISTANCE = 100
        if(direction === 'left' || direction === 'right'){
            return width + DISTANCE
        } else {
            return height + DISTANCE
        }
    }, [direction, height, width])

    console.log(width,distance)
  return (
    <div
    className={
        `
            bg-indigo-500/20 
            rounded  
            min-w-[200px] 
            min-h-[200px]
            w-[${width}px]
            h-[${height}px]
        `
    }
    style={{
        position: 'absolute',
        ...(direction === "right" && { right: `-${distance}px` }),
        ...(direction === "left" && { left: `-${distance}px` }),
        ...(direction === "top" && { top: `-${distance}px` }),
        ...(direction === "bottom" && { bottom: `-${distance}px` }),
        pointerEvents: 'none', // Allow clicks to pass through
        zIndex: 1, // Ensure it's above the background
    }}
/>
  )
}

export default GhostSquare