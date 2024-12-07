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

// auth.ts
import { jwtDecode } from 'jwt-decode'

interface TokenPayload {
	exp: number
}

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem('token')

	if (!token) {
		console.log('here')
		return false
	}

	try {
		const decoded: TokenPayload = jwtDecode(token)
		const isExpired = decoded.exp * 1000 < Date.now()

		return !isExpired
	} catch (error) {
		console.error('Ошибка при декодировании токена', error)
		return false
	}
}
