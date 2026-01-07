import { authClient } from "@/lib/authClient";
import { fetchStudiesByUserId } from "@/services/study/fetch-study-by-user-id";
import { useQuery } from "@tanstack/react-query";

export function useFetchStudiesByUserId() {
    const { data: session } = authClient.useSession()
    return useQuery({
        queryKey: ['studies', session?.user.id],
        queryFn: () => fetchStudiesByUserId(session?.user.id ?? ''),
    })
}