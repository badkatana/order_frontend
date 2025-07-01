import { Task } from '@/entities/Task'
import { assignTaskToProject } from '@/shared/api/projectRoutes'
import { submitTask } from '@/widgets/lib/submitForm'
import { submitEditedTaskQuery } from '@/widgets/lib/submitForm/submitFunctions'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useManageTasks = ({ isEditable, setIsEditable }) => {
	const queryClient = useQueryClient()

	const submitEditedTask = useCallback(async (task: Task) => {
		const { isDraft, taskId, ...clearedTask } = task
		if (task.isDraft) {
			if (task.projectId) {
				const newTask = await submitTask(clearedTask)
				await assignTaskToProject(newTask.taskId, task.projectId)
			} else await submitTask(clearedTask)
		} else await submitEditedTaskQuery({ ...clearedTask, taskId })

		isEditable && setIsEditable(false)
		queryClient.refetchQueries({ queryKey: [task.projectId ? 'projects' : 'calendar'], exact: false })
	}, [])

	return { submitEditedTask }
}
