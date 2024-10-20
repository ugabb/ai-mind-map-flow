import axios from 'axios';
import { headers } from 'next/headers';

export async function generateMindMap(transcription: string) {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/mindmap`, {
            transcription,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ai.mind.map.token')}`
            }
        })

        return data.mindMap
    } catch (error) {
        console.error(error)
        return {
            error: error
        }
    }
}