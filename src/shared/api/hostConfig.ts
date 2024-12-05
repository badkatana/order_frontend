import axios from 'axios'

export const backend = axios.create({
	baseURL: process.env.ORDER_BACKEND_URL,
})

// gonna be interceptors
export const authBackend = axios.create({
	baseURL: process.env.ORDER_BACKEND_URL,
})
