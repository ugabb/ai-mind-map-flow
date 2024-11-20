import { api } from '../axios';

export async function generateMindMap(transcription: string) {
    try {
        const { data } = await api.post(`/mindmap`, {
            transcription
        })

        return data.mindMap
    } catch (error) {
        console.error(error)
        return {
            error: error
        }
    }
}
