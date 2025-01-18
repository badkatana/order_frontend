import { Project } from '@/entities/Project'
import { authBackend } from './hostConfig'

export const getAllProjects = async () => {
	const userId = localStorage.getItem('user_id')
	const response = await authBackend.get(`/api/Project/${userId}`)
	if (response.status === 404) return []
	return response.data ?? []
}

export const editProject = () => {
	return Promise.reject()
}

export const deleteProject = () => Promise.reject()

export const createProject = async (project: Project) => {
	const UserId = localStorage.getItem('user_id')?.toString()
	const { data } = await authBackend.post(`/api/Project`, {
		...project,
		status: false,
		UserId,
	})
	return data
}
