import { getStudyById } from "@/services/study/get-study-by-id";
import { Study } from "@/types/content";
import { useQuery } from "@tanstack/react-query";

interface UseGetStudyByIdProps {
    id: string
}

type GetStudyByIdResponse = {
    study: Study
}

export function useGetStudyById(props: UseGetStudyByIdProps){
    const { id } = props
    return useQuery<GetStudyByIdResponse>({
        queryKey: ['study', id],
        queryFn: async () => {
            const {study} = await getStudyById(id)
            return { study }
        },
        enabled: !!id,
    })
}