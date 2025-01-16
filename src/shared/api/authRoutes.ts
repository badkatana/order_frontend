import { jwtDecode } from 'jwt-decode'
import { backend } from './hostConfig'

/*  @ts-ignore */
export const loginUser = async values => {
	const { data } = await backend.post('/api/User/login', values)
	return { token: data.token, userId: data.user.id }
}

/*  @ts-ignore */
export const registerUser = async values => {
	const { data: unused } = await backend.post('/api/User/register', values)
	const { data } = await backend.post('/api/User/login', values)
	return { token: data.token, userId: unused.id }
}

interface TokenPayload {
	exp: number
}

export const isAuthenticated = (): boolean => {
	const token = sessionStorage.getItem('access_token')

	if (!token) {
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
