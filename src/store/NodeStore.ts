import { create } from 'zustand'
import type { MindMapResponse } from '@/types/mind-map'

export type NodeState = {
  nodes: Node[]
  mindMapToGenerate: any
  setMindMapToGenerate: (mindMap: string) => void
  currentMindMap: MindMapResponse | null
  setCurrentMindMap: (mindMap: MindMapResponse) => void
  // currentNodePosition: XYPosition;
  // addNode: (node: Node) => void;
  // updateNodePosition: (nodeId: string, position: XYPosition) => void;
  // updateNodes: (nodes: Node[]) => void;
  // updateNodeText: (nodeId: string, position: string) => void;
  // deleteNode: (nodeId: string) => void;
  isCreatingNode: boolean
  activeIsCreatingNode: () => void
  disableIsCreatingNode: () => void
  isEditingNode: boolean
  activeIsEditingNode: () => void
  disableIsEditingNode: () => void
  // nodePosition: (position: XYPosition) => void;

  // edges: Edge[];
  mindMapLoadingRequest: boolean
  setMindMapLoadingRequest: (isLoading: boolean) => void
}

export const useNodeStore = create<NodeState>()((set) => ({
  isCreatingNode: false,
  nodes: [],
  mindMapToGenerate: null,
  currentMindMap: null,
  setMindMapToGenerate: (mindMapToGenerate: string) => {
    set(() => ({ mindMapToGenerate: JSON.parse(mindMapToGenerate) }))
  },
  setCurrentMindMap: (mindMap: MindMapResponse) => {
    set(() => ({ currentMindMap: mindMap }))
  },
  activeIsCreatingNode() {
    set(() => ({ isCreatingNode: true }))
  },
  disableIsCreatingNode() {
    set(() => ({ isCreatingNode: false }))
  },
  isEditingNode: false,
  activeIsEditingNode() {
    set(() => ({ isEditingNode: true }))
  },
  disableIsEditingNode() {
    set(() => ({ isEditingNode: false }))
  },
  mindMapLoadingRequest: false,
  setMindMapLoadingRequest: (isLoading: boolean) => {
    set(() => ({ mindMapLoadingRequest: isLoading }))
  },
}))
