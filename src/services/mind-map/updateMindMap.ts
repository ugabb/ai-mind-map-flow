import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import { api } from "../axios";

export interface MindMapResponse {
    id: string;
    title: string;
    mindMap: ReactFlowJsonObject<Node, Edge>;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export interface UpdateMindMapRequest {
    mindMap?: ReactFlowJsonObject<Node, Edge>;
    title?: string;
    userId: string;
    mindMapId: string;
}

export async function updateMindMap({userId, mindMapId, title, mindMap}: UpdateMindMapRequest): Promise<MindMapResponse[]> {
    try {
        const { data, status } = await api.patch(`/update-mind-map/${mindMapId}/userId/${userId}`, {
            ...(title && { title }),
            mindMap
        });

        if (status === 200) {
            return data;
        }
        return [];
    } catch (error: any) {
        console.error(error);
        return [];
    }
}
