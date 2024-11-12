"use client";

import {
  Node,
  NodeProps,
  NodeResizer,
  ResizeDragEvent,
  useReactFlow,
} from "@xyflow/react";
import { memo, useCallback, useEffect, useState } from "react";
import { EditorContent } from "@tiptap/react";
import { Handles } from "../Handles";

import { cn } from "@/lib/utils";
import { Toolbar } from "@/components/Toolbar";
import { indigo } from "tailwindcss/colors";
import { DataNode, useNode } from "@/hooks/useNodes";
import { ExtendedNode } from "@/types/node";
import { getTextColor } from "@/utils/getTextColor";
import { fontSizes } from "@/constants/values";

export interface Direction {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

const Squaree = (props: ExtendedNode) => {
  const {
    id,
    selected = false,
    data,
    width = 0,
    height = 0,
    positionAbsoluteX,
    positionAbsoluteY,
    targetPosition,
    sourcePosition,
  } = props;

  const { deleteElements, updateNodeData, getNode } = useReactFlow();

  const [label, setLabel] = useState(
    typeof data.label === "object" ? "" : data.label
  );

  const {
    handleAddSideNode,
    handleDeleteNodeByPressEnter,
    handleEnableEditing,
    isEditingNode,
    isAddingNode,
    node,
    setIsAddingNode,
    setNode,
    editor,
  } = useNode({
    id,
    selected,
    width,
    height,
    positionAbsoluteX,
    positionAbsoluteY,
    label: typeof label === "string" ? label : undefined,
  });

  const handleDeleteNode = useCallback(() => {
    if (id) {
      const nodesToDelete = [{ id }];
      deleteElements({ nodes: nodesToDelete });
    }
  }, [deleteElements, id]);

  const handleUpdateNodeColor = useCallback(
    (color: string) => {
      // Ensure color is valid
      if (!color) return;
      const textColor = getTextColor(color);
      console.log("Squaree -> textColor", textColor);

      updateNodeData(id, { color, textColor });
      setNode((prevNode) => {
        if (prevNode) {
          return { ...prevNode, data: { ...prevNode.data, color, textColor } };
        }
        return prevNode;
      });
      data.color = color;
      data.textColor = textColor;
    },
    [data, id, updateNodeData] // Include updateNodeData in dependencies
  );

  const handleUpdateTextSize = useCallback(
    (size: "sm" | "md" | "lg" | "xl") => {
      updateNodeData(id, { fontSize: fontSizes[size] });
      setNode((prevNode) => {
        if (prevNode) {
          return { ...prevNode, data: { ...prevNode.data, fontSize: fontSizes[size] } };
        }
        return prevNode;
      });
    },
    [id, setNode, updateNodeData]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteNodeByPressEnter);

    return () => {
      document.removeEventListener("keydown", handleDeleteNodeByPressEnter);
    };
  }, [handleDeleteNodeByPressEnter]);

  useEffect(() => {
    const currentNode = getNode(id) as Node<DataNode>;
    if (currentNode) {
      setNode(currentNode);
    }
  }, []);

  return (
    <div
      className={cn("rounded-lg p-5 flex justify-center items-center", {
        "pointer-events-none": isEditingNode,
      })}
      style={{
        backgroundColor: node?.data?.color || indigo[300],
        color: node?.data?.textColor || "#000000",
        pointerEvents: isEditingNode ? "none" : "auto",
        width: width,
        height: height,
        fontSize: node?.data?.fontSize || fontSizes.md,
      }}
      onClick={handleEnableEditing}
    >
      <NodeResizer
        minHeight={300}
        minWidth={300}
        isVisible={selected ? true : false}
        lineClassName="bg-blue-500"
        handleClassName="w-4 h-4 bg-white border-1 border-blue-500 rounded"
      />

      <Handles
        handleAddSideNode={handleAddSideNode}
        isAddingNode={isAddingNode}
        setIsAddingNode={setIsAddingNode}
        width={width ?? 0}
        height={height ?? 0}
        targetPosition={targetPosition}
        sourcePosition={sourcePosition}
      />

      {selected && (
        <Toolbar
          handleUpdateNodeColor={handleUpdateNodeColor}
          selected={selected}
          handleDeleteNode={handleDeleteNode}
          handleUpdateTextSize={handleUpdateTextSize}
        />
      )}

      <EditorContent editor={editor} />
    </div>
  );
};

export const Square = memo(Squaree);
