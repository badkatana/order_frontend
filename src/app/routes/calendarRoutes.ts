import { backend } from './hostConfig'

//  /api/Calendar/Weekly/UserId?data=["YYYY-MM-DD, YYYY-MM-DD"]
export const getCalendar = async (userId: string, dateStart: string, dateEnd: string) => {
	const { data } = await backend.get(`Calendar/Weekly/${userId}`, {
		params: {
			date: [dateStart, dateEnd],
		},
	})
	return data
}
