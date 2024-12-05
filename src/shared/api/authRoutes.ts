import { backend } from './hostConfig'

// 2) POST http://localhost:5141/api/User/login
export const loginUser = async ({ userName, userPassword, userEmail }) => {
	const { data } = await backend.post('login', { userName, userPassword, userEmail })
	return data
}

// 2) POST http://localhost:5141/api/User/register
export const registerUser = async ({ userName, userPassword, userEmail }) => {
	const { data } = await backend.post('register', { userName, userPassword, userEmail })
	return data
}
