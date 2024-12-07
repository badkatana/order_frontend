import { createTask } from '../../../shared/api/taskRoutes'

export const submitTask = (values: { [key: string]: string | number | null | undefined }) => {
	const newTask = {
		...values,
		hardDeadline: values.hardDeadline?.format('YYYY-MM-DD'),
		softDeadline: values.hardDeadline?.format('YYYY-MM-DD'),
		callendarDate: values.hardDeadline?.format('YYYY-MM-DD'),
	}
	createTask({ ...newTask, status: false, userId: 'b7c89a0a-b76d-4e17-9775-6736a3546878' })
}
