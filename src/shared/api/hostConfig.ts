import axios from 'axios'

const defaultConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL,
}

export const backend = axios.create(defaultConfig)

export const authBackend = axios.create(defaultConfig)

authBackend.interceptors.request.use(
	async config => {
		// const token = sessionStorage.getItem('access_token')
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI3Yzg5YTBhLWI3NmQtNGUxNy05Nzc1LTY3MzZhMzU0Njg3OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJwb2xpbmEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJwb2xpbmFAcG9saW5hIiwiZXhwIjoxNzMzNjAzNjMyLCJpc3MiOiJPcmRlckFwcCIsImF1ZCI6Ik9yZGVyQXBwVXNlcnMifQ.b5XDBnZj1w3yqNlCnU-dr0pGjlsAV6F8Ogwd5ije260'
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
