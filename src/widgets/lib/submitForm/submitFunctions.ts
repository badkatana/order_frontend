import { Event } from '@/entities/Event'
import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { createEvent, createProject, createTask, uploadFileTypeModeus } from '@/shared/api'
import { QueryClient } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'

export const submitTask = (values: Task) => {
	const userId = localStorage.getItem('user_id')
	const newTask = {
		...values,
		hardDeadline: (values.hardDeadline as Dayjs)?.format('YYYY-MM-DD'),
		softDeadline: (values.softDeadline as Dayjs)?.format('YYYY-MM-DD'),
		callendarDate: (values.callendarDate as Dayjs)?.format('YYYY-MM-DD'),
		status: false,
		userId,
	}
	createTask(newTask)
}

export const submitEvent = (values: Event) => {
	const userId = localStorage.getItem('user_id')
	const newEvent = {
		...values,
		periodStart: (values.periodStart as Dayjs)?.format('YYYY-MM-DDTHH:MM'),
		periodEnd: (values.periodEnd as Dayjs)?.format('YYYY-MM-DDTHH:MM'),
		userId,
		status: false,
	}

	createEvent(newEvent)
}

export const uploadScheduleFromModeus = (file: File | null | undefined) => {
	const formData = new FormData()
	if (file) {
		formData.append('file', file)
		uploadFileTypeModeus(formData)
	}
}

export const submitProject = async (project: Project, queryClient: QueryClient) => {
	await createProject(project)
	// @ts-ignore
	queryClient.refetchQueries(['projects'])
}
