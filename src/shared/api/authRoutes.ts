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
