import type { Content } from '@/types/content'
import { getServerSideAPIClient } from '../axios-server'

type GetContentByIdResponse = {
  content: Content
}

export async function getContentById(
  id: string
): Promise<GetContentByIdResponse> {
  const api = await getServerSideAPIClient()
  const { data } = await api.get<GetContentByIdResponse>(`/content/${id}`)
  return data
}
