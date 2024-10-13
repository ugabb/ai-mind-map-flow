import axios from "axios";

export interface MindMapResponse {
    id: string;
    title: string;
    mindMap: JSON;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

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