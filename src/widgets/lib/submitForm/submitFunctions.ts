import { Event } from '@/entities/Event'
import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import {
	createEvent,
	createProject,
	createTask,
	deleteProject,
	editProject,
	editTask,
	uploadFileTypeModeus,
} from '@/shared/api'
import { editEvent } from '@/shared/api/eventsRoutes'
import { DATE_TIME_FORMAT, DefaultObjectString } from '@/shared/constants/constants'
import { QueryClient } from '@tanstack/react-query'
import { formatDateForDB, formatDatesTask } from '../formatDates'

export const submitTask = (values: Task) => {
	const userId = localStorage.getItem('user_id')
	const taskDates = formatDatesTask(values)
	const newTask = {
		...values,
		...taskDates,
		status: false,
		userId,
	}
	createTask(newTask)
}

export const submitEditedTask = (values: Task) => {
	const userId = localStorage.getItem('user_id')
	const taskDates = formatDatesTask(values)
	editTask({ ...values, ...taskDates, userId })
}

export const submitEvent = (values: DefaultObjectString) => {
	const userId = localStorage.getItem('user_id')
	const newEvent = {
		...values,
		periodStart: formatDateForDB(values.periodStart, DATE_TIME_FORMAT),
		periodEnd: formatDateForDB(values.periodEnd, DATE_TIME_FORMAT),
		userId,
		isPrivate: values.isPrivate !== '' && typeof values.isPrivate === 'boolean' ? values.isPrivate : false,
		status: false,
	} as Event

	createEvent(newEvent)
}

export const submitEditedEvent = async (values: DefaultObjectString, event: Event, queryClient: QueryClient) => {
	await editEvent({
		...event,
		...values,
		periodStart: formatDateForDB(values.periodStart, DATE_TIME_FORMAT),
		periodEnd: formatDateForDB(values.periodEnd, DATE_TIME_FORMAT),
		isPrivate:
			values.isPrivate !== '' && typeof values.isPrivate === 'boolean' ? values.isPrivate : event.isPrivate,
	})

	queryClient.refetchQueries({ queryKey: ['projects'] })
}

export const uploadScheduleFromModeus = (file: File | null | undefined) => {
	const formData = new FormData()
	if (file) {
		formData.append('file', file)
		uploadFileTypeModeus(formData)
	}
}

export const submitProject = async (project: Project, queryClient: QueryClient) => {
	const newProject: Project = {
		...project,
		hardDeadline: project.hardDeadline || null,
		softDeadline: project.softDeadline || null,
	}

	if (newProject.projectId) await editProject(newProject)
	else await createProject(newProject)
	queryClient.refetchQueries({ queryKey: ['projects'] })
}

export const deleteProjectById = async (projectId: number, queryClient: QueryClient) => {
	await deleteProject(projectId)
	queryClient.refetchQueries({ queryKey: ['projects'] })
}
