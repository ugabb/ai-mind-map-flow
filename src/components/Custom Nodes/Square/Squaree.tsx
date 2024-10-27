"use client";

import {
  Connection,
  Edge,
  Node,
  NodeProps,
  NodeResizer, useReactFlow
} from "@xyflow/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Handles } from "../Handles";
import { useNodeStore } from "@/store/NodeStore";

import { cn } from "@/lib/utils";
import { ColorPicker } from "@/components/ColorPicker";
import { indigo } from "tailwindcss/colors";

export type DataNode = Node<{
  label: string;
  key?: string;
  value?: any;
  color?: string;
}>;

export interface Direction {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

const Squaree = (props: NodeProps<DataNode>) => {
  const {
    id,
    selected,
    data,
    width,
    height,
    positionAbsoluteX,
    positionAbsoluteY,
    targetPosition,
    sourcePosition,
  } = props;

  const {
    getEdge,
    addEdges,
    addNodes,
    deleteElements,
    updateNodeData,
  } = useReactFlow();

  const [label, setLabel] = useState(
    typeof data.label === "object" ? "" : data.label
  );
  const [isAddingNode, setIsAddingNode] = useState<Direction>({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  const { activeIsEditingNode, disableIsEditingNode } =
    useNodeStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter text here",
        showOnlyCurrent: true,
        showOnlyWhenEditable: true,
        emptyEditorClass: "bg-zinc-100",
      }),
    ],
    content: label,
    editorProps: {
      attributes: {
        class:
          "h-full w-full block border-none cursor-text mx-auto focus:outline-none flex justify-center items-center text-left text-wrap p-3",
      },
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnableEditing = useCallback(() => {
    if (!selected) return; // Only enable editing if node is selected

    activeIsEditingNode(); // Set editing mode in the store

    if (editor) {
      editor.commands.focus();
    }
  }, [selected, activeIsEditingNode]);

  const handleInputBlur = () => {
    disableIsEditingNode(); // Exit editing mode in the store
  };

  const handleNewConnections = (newConnection: Connection) => {
    const curentEdge = getEdge(id);
    if (curentEdge) return;
    const newEdge: Edge = {
      id: `${id}-${newConnection.target}`,
      source: newConnection.source,
      target: newConnection.target,
      sourceHandle: newConnection.sourceHandle,
      targetHandle: newConnection.targetHandle,
      type: "default",
    };
    addEdges(newEdge);
  };

  const handleAddSideNode = (direction: string) => {
    if (direction === "left" || direction === "right") {
      if (!width) return;
      const newNode: Node = {
        id: crypto.randomUUID(),
        position: {
          x:
            positionAbsoluteX +
            (direction === "left"
              ? (-width as number) - 100
              : (width as number) + 100),
          y: positionAbsoluteY,
        },
        data: { label: "" },
        type: "square",
        width: width,
        height: height,
        expandParent: true,
      };

      const newConnection: Connection = {
        source: id,
        target: newNode.id,
        sourceHandle: direction,
        targetHandle: direction === "left" ? "right" : "left",
      };

      handleNewConnections(newConnection);

      addNodes(newNode);
    } else {
      if (!height) return;
      const newNode: Node = {
        id: crypto.randomUUID(),
        position: {
          x: positionAbsoluteX,
          y:
            positionAbsoluteY +
            (direction === "top"
              ? (-height as number) - 100
              : (height as number) + 100),
        },
        data: { label: "" },
        type: "square",
        width: width,
        height: height,
        expandParent: true,
      };

      const newConnection: Connection = {
        source: id,
        target: newNode.id,
        sourceHandle: direction,
        targetHandle: direction === "bottom" ? "top" : "bottom",
      };

      handleNewConnections(newConnection);

      addNodes(newNode);
    }
  };

  const handleDeleteNode = useCallback(
    (event: KeyboardEvent) => {
      if (selected) {
        if (event.key === "Delete" && id) {
          const nodesToDelete = [{ id }];
          deleteElements({ nodes: nodesToDelete });
        }
      }
    },
    [deleteElements, selected, id]
  );

  const handleUpdateNodeColor = useCallback(
    (color: string) => {
      updateNodeData(id, { color: color });
    },
    [updateNodeData, id]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteNode);

    return () => {
      document.removeEventListener("keydown", handleDeleteNode);
    };
  }, [handleDeleteNode]);

  return (
    <div
      className={cn(
        "rounded-lg min-w-[200px]  w-full min-h-[200px] h-full p-5 flex justify-center items-center"
      )}
      style={{ backgroundColor: data.color || indigo[300] }}
      onClick={handleEnableEditing}
    >
      <NodeResizer
        minHeight={height}
        minWidth={width}
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
        <ColorPicker handleUpdateNodeColor={handleUpdateNodeColor} />
      )}

      <EditorContent
        ref={inputRef}
        editor={editor}
        value={label}
        defaultValue={label}
        onBlur={handleInputBlur}
      />
    </div>
  );
};

export const Square = memo(Squaree);
