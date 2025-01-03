import { authBackend } from './hostConfig'

export const getCalendar = async ({ dateStart, dateEnd }) => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.get(`Calendar/Weekly/${userId}`, {
		params: { data: `["${dateStart}","${dateEnd}"]` },
	})
	return data
}
