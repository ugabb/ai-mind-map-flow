import axios from "axios";


export async function getUserByEmail(email: string) {
    try {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${email}`
        );
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}