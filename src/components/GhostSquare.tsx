import { memo, useMemo } from 'react'
import { indigo } from 'tailwindcss/colors'

type GhostSquareProps = {
  width: number
  height: number
  direction?: string
  color?: string
}

const GhostSquare_ = (props: GhostSquareProps) => {
  const { width, height, direction, color } = props
  const distance = useMemo(() => {
    const DISTANCE = 100
    if (direction === 'left' || direction === 'right') {
      return width + DISTANCE
    }
    return height + DISTANCE
  }, [direction, height, width])
  return (
    <div
      style={{
        position: 'absolute',
        ...(direction === 'right' && { right: `-${distance}px` }),
        ...(direction === 'left' && { left: `-${distance}px` }),
        ...(direction === 'top' && { top: `-${distance}px` }),
        ...(direction === 'bottom' && { bottom: `-${distance}px` }),
        pointerEvents: 'none', // Allow clicks to pass through
        zIndex: 1, // Ensure it's above the background
        backgroundColor: color || indigo[300],
        opacity: 0.5,
        minWidth: width ? width : 200,
        minHeight: height ? height : 200,
        width,
        height,
        borderRadius: '0.25rem',
      }}
    />
  )
}

export const GhostSquare = memo(GhostSquare_)
