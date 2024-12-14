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
	return true
}
