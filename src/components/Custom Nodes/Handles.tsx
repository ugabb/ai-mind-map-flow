import { Handle, Position } from "@xyflow/react";
import { Direction } from "./Square/Squaree";
import { GhostSquare } from "../GhostSquare";
import { memo } from "react";

interface HandleProps {
  isAddingNode: Direction;
  setIsAddingNode: React.Dispatch<React.SetStateAction<Direction>>;
  handleAddSideNode: (direction: string) => void;
  width: number | string;
  height: number | string;
  targetPosition: Position | undefined;
  sourcePosition: Position | undefined;
  color?: string;
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
    color
  } = props;

  return (
    <>
      {isAddingNode.top ? (
        <Handle
          id="top"
          type="target"
          position={Position.Top}
          className={`-top-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-up.svg')] bg-no-repeat bg-center`}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, top: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, top: false }))
          }
          onClick={() => handleAddSideNode("top")}
        />
      ) : (
        <Handle
          id="top"
          type="target"
          position={Position.Top}
          className={`-top-6 w-3 h-3 bg-blue-500`}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, top: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, top: false }))
          }
        />
      )}

      {isAddingNode.top && (
        <GhostSquare
          width={width as number}
          height={height as number}
          direction="top"
          color={color}
        />
      )}

      {isAddingNode.bottom ? (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          className={`-bottom-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-down.svg')] bg-no-repeat bg-center`}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: false }))
          }
          onClick={() => handleAddSideNode("bottom")}
        />
      ) : (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          className={`-bottom-6 w-3 h-3 bg-blue-500  `}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, bottom: false }))
          }
        />
      )}

      {isAddingNode.bottom && (
        <GhostSquare
          width={width as number}
          height={height as number}
          direction="bottom"
          color={color}
        />
      )}

      {isAddingNode.right ? (
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          className={`-right-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-right.svg')] bg-no-repeat bg-center`}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, right: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, right: false }))
          }
          onClick={() => handleAddSideNode("right")}
        />
      ) : (
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          className={`-right-6 w-3 h-3 bg-blue-500 ${
            (targetPosition === Position.Right ||
              sourcePosition === Position.Right) &&
            "bg-transparent"
          }`}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, right: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, right: false }))
          }
        />
      )}

      {isAddingNode.right && (
        <GhostSquare
          width={width as number}
          height={height as number}
          direction="right"
          color={color}
        />
      )}

      {isAddingNode.left ? (
        <Handle
          id="left"
          type="source"
          position={Position.Left}
          className={`-left-6 size-10 bg-blue-500 flex justify-center items-center bg-[url('/icons/arrow-left.svg')] bg-no-repeat bg-center`}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, left: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, left: false }))
          }
          onClick={() => handleAddSideNode("left")}
        />
      ) : (
        <Handle
          id="left"
          type="source"
          position={Position.Left}
          className={`-left-6 w-3 h-3 bg-blue-500 `}
          onMouseOver={() =>
            setIsAddingNode((prev) => ({ ...prev, left: true }))
          }
          onMouseLeave={() =>
            setIsAddingNode((prev) => ({ ...prev, left: false }))
          }
        />
      )}

      {isAddingNode.left && (
        <GhostSquare
          width={width as number}
          height={height as number}
          direction="left"
          color={color}
        />
      )}
    </>
  );
};

export const Handles = memo(Handles_);
