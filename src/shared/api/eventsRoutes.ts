import { authBackend } from './hostConfig'

/*  @ts-ignore */
export const createEvent = async event => {
	const { data } = await authBackend.post('/api/Event', event)
	return data
}
