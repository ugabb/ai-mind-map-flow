import { MindMapResponse } from "@/types/mind-map";
import { Edge, XYPosition } from "@xyflow/react";
import { create } from "zustand";

export interface NodeState {
    nodes: Node[];
    mindMapToGenerate: string;
    setMindMapToGenerate: (mindMap: string) => void;
    currentMindMap: MindMapResponse | null;
    setCurrentMindMap: (mindMap: MindMapResponse) => void;
    // currentNodePosition: XYPosition;
    // addNode: (node: Node) => void;
    // updateNodePosition: (nodeId: string, position: XYPosition) => void;
    // updateNodes: (nodes: Node[]) => void;
    // updateNodeText: (nodeId: string, position: string) => void;
    // deleteNode: (nodeId: string) => void;
    isCreatingNode: boolean;
    activeIsCreatingNode: () => void;
    disableIsCreatingNode: () => void;
    // nodePosition: (position: XYPosition) => void;
  
    // edges: Edge[];
    mindMapLoadingRequest: boolean;
    setMindMapLoadingRequest: (isLoading: boolean) => void;
}

export const useNodeStore = create<NodeState>()((set) => ({
    isCreatingNode: false,
    nodes: [],
    mindMapToGenerate: "",
    currentMindMap: null,
    setMindMapToGenerate: (mindMapToGenerate: string) => {
        set(() => ({ mindMapToGenerate: JSON.parse(mindMapToGenerate) }));
    },
    setCurrentMindMap: (mindMap: MindMapResponse) => {
        set(() => ({ currentMindMap: mindMap }));
    },
    activeIsCreatingNode() {
        set(() => ({ isCreatingNode: true }));
    },
    disableIsCreatingNode() {
        set(() => ({ isCreatingNode: false }));
    },
    mindMapLoadingRequest: false,
    setMindMapLoadingRequest: (isLoading: boolean) => {
        set(() => ({ mindMapLoadingRequest: isLoading }));
    }
}))