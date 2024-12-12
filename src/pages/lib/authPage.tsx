import { loginUser, registerUser } from '../../shared/api/authRoutes'

export const registerOrLoginUser = async (values, navigate) => {
	const type = values.type
	delete values.type
	const { token, userId } = type.includes('1') ? await registerUser(values) : await loginUser(values)

	if (token && userId) {
		sessionStorage.setItem('access_token', token)
		localStorage.setItem('user_id', userId)
		navigate('/calenders')
	}
}
