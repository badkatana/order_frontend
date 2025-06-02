import { DefaultObject } from '../constants/constants'
import { backend } from './hostConfig'

export const loginUser = async (values: DefaultObject) => {
	const { data } = await backend.post('/api/User/login', values)
	return { token: data.token, userId: data.user.userId }
}

export const registerUser = async (values: DefaultObject) => {
	const { data: unused } = await backend.post('/api/User/register', values)
	const { data } = await backend.post('/api/User/login', values)
	return { token: data.token, userId: unused.user.userId }
}
