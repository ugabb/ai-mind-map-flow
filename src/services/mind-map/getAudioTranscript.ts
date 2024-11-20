import axios from 'axios';
import { api } from '../axios';

interface GetAudioTranscriptResponse{
    transcription: string,
    status: number
}

export async function getAudioTranscript(audio: File): Promise<GetAudioTranscriptResponse>{
    try {
        if (!audio) {
            throw new Error('No audio file provided');
        }
        const formData = new FormData()
        formData.append("file", audio)
        console.log(formData, audio)
        const { data, status,  } = await api.post(
            `/transcribe`,
            formData, // Pass formData directly as the second argument
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Axios will handle the boundary automatically
                },
            }
        );

        return {
            transcription: data.transcription,
            status
        }
    } catch (error) {
        console.error(error)
       return {
        status: 500,
        transcription: ''
       }
    }
}
