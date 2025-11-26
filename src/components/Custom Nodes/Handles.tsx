import { Handle, Position } from '@xyflow/react'
import { memo } from 'react'
import { GhostSquare } from '../GhostSquare'
import type { Direction } from './Square/Squaree'

type HandleProps = {
  isAddingNode: Direction
  setIsAddingNode: React.Dispatch<React.SetStateAction<Direction>>
  handleAddSideNode: (direction: string) => void
  width: number | string
  height: number | string
  targetPosition: Position | undefined
  sourcePosition: Position | undefined
  color?: string
}

export const Handles_ = (props: HandleProps) => {
  const {
    handleAddSideNode,
    isAddingNode,
    setIsAddingNode,
    width,
    height,
    targetPosition,
    sourcePosition,
    color,
  } = props

  return (
    <>
      {isAddingNode.top ? (
        <Handle
          className={`-top-6 flex size-10 items-center justify-center bg-[url('/icons/arrow-up.svg')] bg-center bg-primary bg-no-repeat`}
          id="top"
          onClick={() => handleAddSideNode('top')}
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, top: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, top: true }))
          }
          position={Position.Top}
          type="target"
        />
      ) : (
        <Handle
          className={'-top-6 h-3 w-3 bg-primary'}
          id="top"
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, top: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, top: true }))
          }
          position={Position.Top}
          type="target"
        />
      )}

      {isAddingNode.top && (
        <GhostSquare
          color={color}
          direction="top"
          height={height as number}
          width={width as number}
        />
      )}

      {isAddingNode.bottom ? (
        <Handle
          className={`-bottom-6 flex size-10 items-center justify-center bg-[url('/icons/arrow-down.svg')] bg-center bg-primary bg-no-repeat`}
          id="bottom"
          onClick={() => handleAddSideNode('bottom')}
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: true }))
          }
          position={Position.Bottom}
          type="source"
        />
      ) : (
        <Handle
          className={'-bottom-6 h-3 w-3 bg-primary'}
          id="bottom"
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: true }))
          }
          position={Position.Bottom}
          type="source"
        />
      )}

      {isAddingNode.bottom && (
        <GhostSquare
          color={color}
          direction="bottom"
          height={height as number}
          width={width as number}
        />
      )}

      {isAddingNode.right ? (
        <Handle
          className={`-right-6 flex size-10 items-center justify-center bg-[url('/icons/arrow-right.svg')] bg-center bg-primary bg-no-repeat`}
          id="right"
          onClick={() => handleAddSideNode('right')}
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, right: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, right: true }))
          }
          position={Position.Right}
          type="source"
        />
      ) : (
        <Handle
          className={`-right-6 h-3 w-3 bg-primary ${
            (targetPosition === Position.Right ||
              sourcePosition === Position.Right) &&
            'bg-transparent'
          }`}
          id="right"
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, right: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, right: true }))
          }
          position={Position.Right}
          type="source"
        />
      )}

      {isAddingNode.right && (
        <GhostSquare
          color={color}
          direction="right"
          height={height as number}
          width={width as number}
        />
      )}

      {isAddingNode.left ? (
        <Handle
          className={`-left-6 flex size-10 items-center justify-center bg-[url('/icons/arrow-left.svg')] bg-center bg-primary bg-no-repeat`}
          id="left"
          onClick={() => handleAddSideNode('left')}
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, left: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, left: true }))
          }
          position={Position.Left}
          type="source"
        />
      ) : (
        <Handle
          className={'-left-6 h-3 w-3 bg-primary'}
          id="left"
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, left: false }))
          }
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, left: true }))
          }
          position={Position.Left}
          type="source"
        />
      )}

      {isAddingNode.left && (
        <GhostSquare
          color={color}
          direction="left"
          height={height as number}
          width={width as number}
        />
      )}
    </>
  )
}

export const Handles = memo(Handles_)
