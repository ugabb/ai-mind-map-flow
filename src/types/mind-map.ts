import type { Edge, Node, ReactFlowJsonObject } from '@xyflow/react'

export type MindMap = {
  nodes: Node[]
  edges: Edge[]
  viewport: {
    x: number
    y: number
    zoom: number
  }
}

export type MindMapResponse = {
  id: string
  title: string
  mindMap: ReactFlowJsonObject<Node, Edge> | string
  createdAt: string
  updatedAt: string
  userId: string
}
