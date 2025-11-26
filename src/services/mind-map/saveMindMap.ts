import type { Edge, Node, ReactFlowJsonObject } from '@xyflow/react'
import type { MindMapResponse } from '@/types/mind-map'
import { api } from '../axios'

export type SaveMindMapResponse = {
  message: string
  data: MindMapResponse
  error?: any
}
export type SaveMindRequest = {
  title: string
  mindMap: ReactFlowJsonObject<Node, Edge>
  userId: string
}

export async function saveMindMap({
  title,
  mindMap,
  userId,
}: SaveMindRequest): Promise<MindMapResponse> {
  try {
    const { data } = await api.post<SaveMindMapResponse>(
      `/save-mind-map/${userId}`,
      {
        title,
        mindMap,
      }
    )

    return data.data
  } catch (error) {
    throw new Error(`Failed to save mind map: ${error}`)
  }
}
