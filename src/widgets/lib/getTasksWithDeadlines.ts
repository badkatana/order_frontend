import { Task } from '../../entities/Task'

export const getTaskWithDeadlines = (tasks: Task[], date: string) => {
	if (tasks === null) return
	const hard = tasks.filter(task => task.hardDeadline?.includes(date))
	const soft = tasks.filter(task => task.softDeadline?.includes(date))
	return { hardDeadlinesTasks: hard, softDeadlinesTasks: soft }
}
