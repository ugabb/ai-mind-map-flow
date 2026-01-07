import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 7 * 60 * 1000, // 7 minutes
	withCredentials: true, // This ensures cookies are sent with requests
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

// Interceptor to automatically add cookies for server-side requests
api.interceptors.request.use(async (config) => {
	// Check if we're in a server environment
	if (typeof window === 'undefined') {
		try {
			// Dynamically import next/headers only when needed
			const { headers } = await import('next/headers')
			const headersList = await headers()
			const cookies = headersList.get('cookie')
			if (cookies) {
				config.headers.Cookie = cookies
			}
		} catch (error) {
			// Ignore errors in non-server contexts or when next/headers is not available
		}
	}
	return config
})

export { api }
