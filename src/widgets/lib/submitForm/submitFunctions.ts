import { createEvent, createProject, createTask, uploadFileTypeModeus } from '@/shared/api'

export const submitTask = (values: { [key: string]: string | number | null | undefined }) => {
	const userId = localStorage.getItem('user_id')
	const newTask = {
		...values,
		hardDeadline: values.hardDeadline?.format('YYYY-MM-DD'),
		softDeadline: values.softDeadline?.format('YYYY-MM-DD'),
		callendarDate: values.callendarDate?.format('YYYY-MM-DD'),
	}
	createTask({ ...newTask, status: false, userId: userId })
}

export const submitEvent = (values: { [key: string]: string | number | null | undefined }) => {
	const userId = localStorage.getItem('user_id')
	const newEvent = {
		...values,
		periodStart: values.periodStart?.format('YYYY-MM-DDTHH:MM'),
		periodEnd: values.periodEnd?.format('YYYY-MM-DDTHH:MM'),
		userId: userId,
		status: false,
		isPrivate: false,
	}

	createEvent(newEvent)
}

export const uploadScheduleFromModeus = file => {
	const formData = new FormData()
	formData.append('file', file)
	uploadFileTypeModeus(formData)
}

export const submitProject = async (project, queryClient) => {
	await createProject(project)
	queryClient.refetchQueries(['projects'])
}
