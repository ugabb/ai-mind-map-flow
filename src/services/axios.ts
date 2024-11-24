import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";


export const cookieValues = {
    token: "authjs.session-token"
} as const

export const isProduction = process.env.NODE_ENV === "production";
export const productionCookieToken = '__Secure-' + cookieValues.token;

export type CookieKeyType = keyof typeof cookieValues;
export type CookieValuesType = typeof cookieValues[CookieKeyType];

export function getAPIClient(context?: any) {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL
    })

    api.interceptors.request.use(async (config) => {
        const session = await getSession()  
        const token = session?.user.token?.value

        try {
            if (token) {
                if (config.headers) {
                    config.headers.Authorization = `Bearer ${token}`
                }
            } else {
                toast.error('No token found in cookies.');
            }
            return config
        } catch (error) {
            toast.error(String(error)) || toast.error("Ops! Something is wrong!")
            console.error('Error during request interceptor:', error)
            return Promise.reject(error)
        }
    })


    return api
}

export const api = getAPIClient()
