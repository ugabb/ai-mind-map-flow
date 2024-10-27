"use client";

import {
  Connection,
  Edge,
  EdgeProps,
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from "@xyflow/react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
} from "react-icons/fi";
import { GhostSquare } from "../../GhostSquare";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Handles } from "../Handles";

export type DataNode = Node<{
  label: string;
  key?: string;
  value?: any;
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
    getEdges,
    addEdges,
    setEdges,
    addNodes,
    deleteElements,
    updateNodeData,
    updateNode,
  } = useReactFlow();

  const [label, setLabel] = useState(
    typeof data.label === "object" ? "" : data.label
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNode, setIsAddingNode] = useState<Direction>({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: label,
    editorProps: {
      attributes: {
        class:
          "h-full w-full border-none cursor-text mx-auto focus:outline-none",
      },
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnableEditing = () => {
    if (!selected) return;
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input element when double-clicked
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
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

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteNode);

    return () => {
      document.removeEventListener("keydown", handleDeleteNode);
    };
  }, [handleDeleteNode]);

  return (
    <div
      className="bg-violet-500 rounded-lg min-w-[200px]  w-fit min-h-[200px] h-full p-5 "
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

      {/* <div className='flex justify-center items-center h-full w-full text-left text-wrap p-3'>
                { 
                (typeof data.label === 'object') ? 
                Object.entries(data.label).map(([key, value], index) =>(
                    <div key={index} className='flex flex-col justify-center items-center p-3 w-full h-full'>
                        <span className="">{key} : {String(value)}</span>
                    </div>                    
                )) : (
                    <div className='flex justify-center items-center h-full w-full p-3 text-wrap '>
                        {selected ? (
                            <input
                                className={`border-none bg-transparent w-full min-h-full h-fit max-w-[${width}px] focus:outline-none text-center text-white text-wrap break-words resize-none overflow-y-hidden placeholder-zinc-200`}
                                value={label}
                                onChange={(e) => {
                                    setLabel(e.target.value)
                                    updateNodeData(id, {label: e.target.value})
                                }}
                                onBlur={handleInputBlur}
                                placeholder='Enter text here'
                            />
                        ) : (
                            <span className={`text-white w-fit max-w-[${width}px] text-center cursor-text `}>{label}</span>
                        )}
                    </div>
                )
                }   
            </div> */}

      <EditorContent editor={editor} defaultValue={label} value={label} />
    </div>
  );
};

export const Square = memo(Squaree);
