import axios from 'axios'

const defaultConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL,
}

export const backend = axios.create(defaultConfig)

export const authBackend = axios.create(defaultConfig)

authBackend.interceptors.request.use(
	async config => {
		const token = sessionStorage.getItem('access_token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
