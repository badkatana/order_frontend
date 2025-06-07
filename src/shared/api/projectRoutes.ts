import { Project } from '@/entities/Project'
import { authBackend } from './hostConfig'

export const getAllProjects = async () => {
	const userId = localStorage.getItem('user_id')
	const response = await authBackend.get(`/api/Project/${userId}`)
	if (response.status === 404) return []
	return response.data ?? []
}

export const editProject = async (project: Project) =>
	await authBackend.put(`api/Project/${project.projectId}`, project)

export const deleteProject = async (projectId: number) => await authBackend.delete(`api/Project/${projectId}`)

export const createProject = async (project: Project) => {
	const userId = localStorage.getItem('user_id')?.toString()
	const newProject = {
		...project,
		status: false,
	}

	const { data } = await authBackend.post(`/api/Project`, newProject, {
		params: { userId },
	})

	return data
}

export const assignUserToProject = async (usersIds: string[], projectId: number) => {
	return await authBackend.post(`/api/Project/${projectId}/users`, usersIds)
}

export const unassignUserFromProject = async (usersIds: string[], projectId: number) => {
	return await authBackend.delete(`/api/Project/${projectId}/users`, { data: usersIds })
}

export const assignTaskToProject = async (taskId: string, projectId) => {
	return await authBackend.post(`/api/Project/${projectId}/assign-tasks`, [taskId])
}

export const unassignTaskFromProject = async (taskId: string, projectId: number) => {
	return await authBackend.post(`/api/Project/${projectId}/unassign-tasks`, [taskId])
}

export const assingNotesToProject = async (noteId: number | string, projectId: number) => {
	return await authBackend.post(`/api/Project/${projectId}`, noteId)
}
