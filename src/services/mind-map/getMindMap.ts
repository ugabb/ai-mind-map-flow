
import { MindMap } from "@/types/mind-map";
import { api } from "../axios";

export interface MindMapResponse {
    id: string;
    title: string;
    mindMap: MindMap;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export async function getMindMap(userId: string, mindMapId: string): Promise<MindMapResponse | null> {
    try {
        const { data, status } = await api.get(`/mindmap/${mindMapId}/userId/${userId}`);

        if (status === 200) {
            return data;
        }
        return null
    } catch (error) {
        console.error(error);
        return null
    }
}
