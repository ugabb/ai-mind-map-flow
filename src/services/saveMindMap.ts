import axios from "axios";

export interface SaveMindRequest {
    title: string;
    mindMap: any
}

export async function saveMindMap(data: SaveMindRequest) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-mind-map/66f944142879239540d23bdd`, data) // Killua's user id

        return "Mind Map saved"
    } catch (error) {
        console.error(error)
        return {
            error: error
        }
    }
}