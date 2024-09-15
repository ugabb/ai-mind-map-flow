import { Edge, XYPosition } from "@xyflow/react";
import { create } from "zustand";

export interface NodeState {
    nodes: Node[];
    mindMap: string;
    setMindMap: (mindMap: string) => void;
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
}

export const useNodeStore = create<NodeState>()((set) => ({
    isCreatingNode: false,
    nodes: [],
    mindMap: "",
    setMindMap: (mindMap: string) => {
        set(() => ({ mindMap: JSON.parse(mindMap) }));
    },
    activeIsCreatingNode() {
        set(() => ({ isCreatingNode: true }));
    },
    disableIsCreatingNode() {
        set(() => ({ isCreatingNode: false }));
    },
}))