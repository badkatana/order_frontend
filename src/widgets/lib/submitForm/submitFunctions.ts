import { createEvent } from '../../../shared/api/eventsRoutes'
import { createTask } from '../../../shared/api/taskRoutes'

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
	console.log(values)
	const newEvent = {
		...values,
		periodStart: values.periodStart?.format('YYYY-MM-DDTHH:MM'),
		periodEnd: values.periodEnd?.format('YYYY-MM-DDTHH:MM'),
		userId: userId,
		status: false,
		isPrivate: false,
	}

	createEvent(newEvent, userId)
}
