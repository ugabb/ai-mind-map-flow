import type { Content } from "@/types/content";
import { getServerSideAPIClient } from "../axios-server";

type GetContentByIdResponse = {
  content: Content;
};

export async function getContentById(
  id: string
): Promise<GetContentByIdResponse> {
  try {
    const api = await getServerSideAPIClient();
    const { data } = await api.get<GetContentByIdResponse>(`/content/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
