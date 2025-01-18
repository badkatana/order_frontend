// Task
// попросить дашу добавить patch
// 1) GET http://localhost:5141/api/Task/8
// 2) PUT http://localhost:5141/api/Task/8
// 3) DELETE http://localhost:5141/api/Task/7
// 4) POST http://localhost:5141/api/Task

import { authBackend } from './hostConfig'

/*  @ts-ignore */
export const getTask = async ({ taskId }) => {
	const { data } = await authBackend.get(`/api/Task/${taskId}`)
	return data
}

/*  @ts-ignore */
export const changeTask = async task => {
	const { data } = await authBackend.put(`/api/Task/${task.id}`, task)
	return data
}

/*  @ts-ignore */
export const deleteTask = async taskId => {
	const { data } = await authBackend.delete(`/api/Task/${taskId}`)
	return data
}

/*  @ts-ignore */
export const createTask = async task => {
	const { data } = await authBackend.post(`/api/Task`, task)
	return data
}
