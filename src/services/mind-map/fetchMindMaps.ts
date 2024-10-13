import { MindMapResponse } from "@/types/mind-map";
import axios from "axios";

export async function fetchMindMap(userId: string): Promise<MindMapResponse[]> {
    try {
        const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mindmap/${userId}`);

        if (status === 200) {
            return data;
        }
        return []
    } catch (error) {
        console.error(error);
        return []
    }
}