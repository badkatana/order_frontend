import { Calendar } from '../../entities/Calendar'
import { Event } from '../../entities/Event'
import { Task } from '../../entities/Task'

export const groupArraysByDate = (input: Calendar, datesRange: string[]) => {
	console.log('input', input)
	const tasks = input.tasks.$values
	const events = input.events.$values
	const outputArray: { [key: string]: { tasks: Task[] | []; events: Event[] | [] } } = {}

	datesRange.map(date => {
		const tasksToDate = tasks.filter(
			(task: {
				callendarDate: string | undefined | null
				softDeadline: string | undefined | null
				hardDeadline: string | undefined | null
			}) =>
				task.callendarDate?.includes(date) ||
				task.softDeadline?.includes(date) ||
				task.hardDeadline?.includes(date)
		)
		const eventsToDate = events.filter((event: { periodStart: string }) => event.periodStart?.includes(date))

		outputArray[date] = { tasks: tasksToDate, events: eventsToDate }
	})

	return outputArray
}
