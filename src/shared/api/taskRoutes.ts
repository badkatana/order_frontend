import { Task } from '@/entities/Task'
import { authBackend } from './hostConfig'

export const getTask = async ({ taskId }: { taskId: number }) => {
	const { data } = await authBackend.get(`/api/Task/${taskId}`)
	return data
}

export const editTask = async (task: Task) => {
	const { data } = await authBackend.put(`/api/Task/${task.id}`, task)
	return data
}
export const deleteTask = async (taskId: number) => {
	const { data } = await authBackend.delete(`/api/Task/${taskId}`)
	return data
}

export const createTask = async (task: Task) => {
	const { data } = await authBackend.post(`/api/Task`, task)
	return data
}
