// Task
// попросить дашу добавить patch
// 1) GET http://localhost:5141/api/Task/8
// 2) PUT http://localhost:5141/api/Task/8
// 3) DELETE http://localhost:5141/api/Task/7
// 4) POST http://localhost:5141/api/Task

import { authBackend } from './hostConfig'

export const getTask = async ({ taskId }) => {
	const { data } = await authBackend.get(`Task/${taskId}`)
	return data
}

export const changeTask = async ({ taskId }) => {
	const { data } = await authBackend.put(`Task/${taskId}`)
	return data
}

export const deleteTask = async ({ taskId }) => {
	const { data } = await authBackend.delete(`Task/${taskId}`)
	return data
}

export const createTask = async task => {
	console.log(task)
	const { data } = await authBackend.post(`Task`, task)
	return data
}
