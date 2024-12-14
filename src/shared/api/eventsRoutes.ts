import { authBackend } from './hostConfig'

export const createEvent = async event => {
	const { data } = await authBackend.post('Event', event)
	return data
}
