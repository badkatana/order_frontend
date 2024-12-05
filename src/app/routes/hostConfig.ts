import axios from 'axios'

export const backend = axios.create({
	baseURL: process.env.ORDER_BACKEND_URL,
})
