import { Event } from '@/entities/Event'
import { authBackend } from './hostConfig'

export const createEvent = async (event: Event) => {
	const { data } = await authBackend.post('/api/Event', event)
	return data
}

export const deleteEvent = async (eventId: number) => {
	const { data } = await authBackend.delete(`/api/Event/${eventId}`)
	return data
}

export const editEvent = async (event: Event) => {
	const { data } = await authBackend.put(`/api/Event/${event.id}`, event)
	return data
}
