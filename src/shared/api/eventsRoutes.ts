import { authBackend } from './hostConfig'

export const createEvent = async event => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.post('Event', event)
	return data
}
