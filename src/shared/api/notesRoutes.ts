import { Note } from '@/entities/Note'
import { authBackend } from './hostConfig'

export const getAllUserNotes = async () => {
	const userId = localStorage.getItem('user_id')
	const response = await authBackend.get(`/api/Note/inbox/${userId}`)
	return response.status === 200 ? response.data?.$values : []
}

export const createUserNote = async (note: Note) => {
	const { data } = await authBackend.post(`/api/Note`, note)
	return data
}

export const editUserNote = async (note: Note) => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.put(`/api/Note/${note.id}`, { ...note, userId })
	return data
}

export const deleteUserNote = async (noteId: string) => {
	const response = await authBackend.delete(`/api/Note/${noteId}`)
	return response.status
}
