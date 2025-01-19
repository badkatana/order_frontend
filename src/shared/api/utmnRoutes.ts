import { authBackend } from './hostConfig'

export const getActivities = async () => {
	const { data } = await authBackend.get('/api/events')
	return data
}

export const addEventToCalender = async (eventText: string) => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.post('/api/events/add-events-to-calender', { eventText, userId })
	return data
}
