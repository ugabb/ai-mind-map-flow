import { SignUpFormValues } from "@/app/(auth)/sign-up/page";
import axios from "axios";

interface RegisterUserResponse {
    status: number;
    message?: string;
}

export async function registerUser(data: SignUpFormValues): Promise<RegisterUserResponse> {
    const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        ...(data.profilePicture && { profilePicture: data.profilePicture }),
    };
    try {
        const { status, data: reqData } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/user`,
            formData
        );

        return { status };
    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err) && err.response) {
            return { status: 400, message: err.response.data.message };
        }
        return { status: 400, message: "An unknown error occurred" };
    }
}