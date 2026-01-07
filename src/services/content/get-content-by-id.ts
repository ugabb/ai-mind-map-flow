import type { Study } from '@/types/content'
import { api } from '../axios'

type GetContentByIdResponse = {
  content: Study
}

export async function getContentById(
  id: string
): Promise<GetContentByIdResponse> {
  const { data } = await api.get<GetContentByIdResponse>(`/content/${id}`)
  return data
}
