import { DefaultObject } from '@/shared/constants/constants'
import { loginUser, registerUser } from '../../shared/api/userRoutes'

export const registerOrLoginUser = async (values: DefaultObject, navigate: (data: string) => void) => {
	const type = values.type
	delete values.type
	const { token, userId } = type.includes('1') ? await registerUser(values) : await loginUser(values)

	if (token && userId) {
		sessionStorage.setItem('access_token', token)
		localStorage.setItem('user_id', userId)
		navigate('/calenders')
	}
}
