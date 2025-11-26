import { BaseEdge, type EdgeProps, getSimpleBezierPath } from '@xyflow/react'
import { memo } from 'react'

function DefaultEdge_({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, _labelX, _labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <BaseEdge
      className="stroke-2"
      markerEnd={markerEnd}
      path={edgePath}
      style={style}
    />
  )
}

export const DefaultEdge = memo(DefaultEdge_)
