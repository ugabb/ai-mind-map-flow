import { Study } from "@/types/content";
import { api } from "../axios";

export async function fetchStudiesByUserId(userId: string): Promise<{
    studies: Study[]
    total: number
    page: number
    limit: number
}> {
    const { data } = await api.get(`/v2/study/user/${userId}/list`)
    return data
}