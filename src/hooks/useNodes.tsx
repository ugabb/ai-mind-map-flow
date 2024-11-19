import { Direction } from "@/components/Custom Nodes/Square/Squaree";
import { useNodeStore } from "@/store/NodeStore";
import { Connection, Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export type DataNode = {
  label: string;
  key?: string;
  value?: any;
  color?: string;
  textColor?: string; 
  fontSize?: number;
};

interface useNodeProps {
  id: string;
  selected: boolean;
  width: number;
  height: number;
  positionAbsoluteX: number;
  positionAbsoluteY: number;
  label?: string;
  color?: string;
}

export const useNode = (props: useNodeProps) => {
  const {
    selected,
    id,
    width,
    height,
    positionAbsoluteX,
    positionAbsoluteY,
    label,
    color
  } = props;
  const [node, setNode] = useState<Node<DataNode> | null>(null);

  const [isAddingNode, setIsAddingNode] = useState<Direction>({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  const { isEditingNode, activeIsEditingNode, disableIsEditingNode } =
    useNodeStore();

  const { getEdge, addEdges, addNodes, deleteElements } = useReactFlow();

  const handleInputBlur = useCallback(() => {
    disableIsEditingNode(); // Exit editing mode in the store
  }, [disableIsEditingNode]);

  const handleNewConnections = useCallback(
    (newConnection: Connection) => {
      const newEdge: Edge = {
        id: `${id}-${newConnection.target}`,
        source: newConnection.source,
        target: newConnection.target,
        sourceHandle: newConnection.sourceHandle,
        targetHandle: newConnection.targetHandle,
        type: "default",
      };
      addEdges(newEdge);
    },
    [addEdges, id]
  );

  const handleAddSideNode = useCallback((direction: string) => {
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
        data: { label: "", color },
        type: "square",
        width: width,
        height: height,
        expandParent: true,
      };

      const newConnection: Connection = {
        source: id!,
        target: newNode.id,
        sourceHandle: direction,
        targetHandle: direction === "left" ? "right" : "left",
      };

      addNodes(newNode);
      handleNewConnections(newConnection);

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
        data: { label: "", color },
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

      
      addNodes(newNode);
      handleNewConnections(newConnection);
    }
  }, [addNodes, color, handleNewConnections, height, id, positionAbsoluteX, positionAbsoluteY, width]);

  const handleDeleteNodeByPressEnter = useCallback(
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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter text here",
        emptyEditorClass: "bg-zinc-100",
      }),
    ],
    content: label,
    editorProps: {
      attributes: {
        class:
          "nodrag h-full w-full block border-none cursor-text mx-auto focus:outline-none flex justify-center items-center text-left text-wrap p-3 truncate z-50",
      },
    },
    onBlur: handleInputBlur,
    immediatelyRender: false,
  });

  const handleEnableEditing = useCallback(() => {
    if (!selected) return; // Only enable editing if node is selected

    activeIsEditingNode(); // Set editing mode in the store

    if (editor) {
      editor.commands.focus();
    }
  }, [selected, activeIsEditingNode, editor]);

  return {
    node,
    setNode,
    isAddingNode,
    setIsAddingNode,
    handleInputBlur,
    isEditingNode,
    handleEnableEditing,
    handleAddSideNode,
    handleDeleteNodeByPressEnter,
    editor,
  };
};
