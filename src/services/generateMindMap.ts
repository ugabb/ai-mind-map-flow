import axios from 'axios';

export async function generateMindMap(transcription: string){
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/mindmap`,{
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