import { MindMapResponse } from "@/types/mind-map";
import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import axios from "axios";

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
        const { data } = await axios.post<SaveMindMapResponse>(`${process.env.NEXT_PUBLIC_API_URL}/save-mind-map/${userId}`, {
            title,
            mindMap
        })

        return data.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to save mind map: " + error)
    }
}
