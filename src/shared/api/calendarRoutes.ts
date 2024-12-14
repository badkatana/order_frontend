import { authBackend } from './hostConfig'

//  /api/Calendar/Weekly/UserId?data=["YYYY-MM-DD, YYYY-MM-DD"]
export const getCalendar = async ({ dateStart, dateEnd }) => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.get(`Calendar/Weekly/${userId}`, {
		params: { data: `["${dateStart}","${dateEnd}"]` },
	})
	return data
}
