import { MindMapResponse } from "@/types/mind-map";
import axios from "axios";
import { api } from "../axios";

export async function fetchMindMap(userId: string): Promise<MindMapResponse[]> {
    console.log('fetchMindMap', userId)
    try {
        const { data, status } = await api.get(`/mindmap/${userId}`);

        if (status === 200) {
            return data;
        }
        return []
    } catch (error) {
        console.error(error);
        return []
    }
}
