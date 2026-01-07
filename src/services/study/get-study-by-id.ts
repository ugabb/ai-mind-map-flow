import { Study, Transcription } from "@/types/content"
import { api } from "../axios"

type GetStudyByIdResponse = {
    study: Study
    transcript: Transcription
}

export async function getStudyById(id: string): Promise<GetStudyByIdResponse> {
    const response = await api.get<GetStudyByIdResponse>(`/v2/study/${id}`)
    return {
        study: response.data.study,
        transcript: response.data.transcript,
    }
}