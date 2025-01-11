import { authBackend } from './hostConfig'

export const getAllProjects = async () => {
	const userId = localStorage.getItem('user_id')
	const response = await authBackend.get(`/Project/${userId}`)
	return response.data ?? []
}

export const editProject = () => {
	return Promise.reject()
}

export const deleteProject = () => Promise.reject()

export const createProject = async project => {
	const userId = localStorage.getItem('user_id')
	const { data } = await authBackend.post(`/Project`, { ...project, userId, status: false })
	return data
}
