import type { MindMapResponse } from '@/types/mind-map'
import { api } from '../axios'

export async function fetchMindMap(userId: string): Promise<MindMapResponse[]> {
  try {
    const { data, status } = await api.get(`/mindmap/${userId}`)

    if (status === 200) {
      return data
    }
    return []
  } catch (_error) {
    return []
  }
}
