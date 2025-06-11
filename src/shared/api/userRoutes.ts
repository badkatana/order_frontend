import { DefaultObject } from '../constants/constants'
import { authBackend, backend } from './hostConfig'

export const loginUser = async (values: DefaultObject) => {
	const { data } = await backend.post('/api/User/login', values)
	console.log(data)
	return { token: data.token, userId: data.user.userId }
}

export const registerUser = async (values: DefaultObject) => {
	const { data: unused } = await backend.post('/api/User/register', values)
	const { data } = await backend.post('/api/User/login', values)
	return { token: data.token, userId: unused.userId }
}

export const getAllUsers = async () => {
	const { data } = await authBackend.get('/api/User/users')
	return data
}

export const getUserInfo = async () => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.get(`/api/User/id/${userId}`)
	return data
}
