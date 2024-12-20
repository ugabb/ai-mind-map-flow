import { MindMapResponse } from "@/types/mind-map";
import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import { api } from "../axios";

export interface SaveMindMapResponse {
    message: string;
    data: MindMapResponse;
    error?: any;
}
export interface SaveMindRequest {
    title: string;
    mindMap: ReactFlowJsonObject<Node, Edge>
    userId: string
}


export async function saveMindMap({title, mindMap, userId}: SaveMindRequest): Promise<MindMapResponse> {
    try {
        const { data } = await api.post<SaveMindMapResponse>(`/save-mind-map/${userId}`, {
            title,
            mindMap
        })

        return data.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to save mind map: " + error)
    }
}
