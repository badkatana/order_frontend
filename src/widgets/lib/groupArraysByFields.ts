import { Project } from '@/entities/Project'
import { Calendar } from '../../entities/Calendar'
import { Event } from '../../entities/Event'
import { Task } from '../../entities/Task'

export const groupArraysByDate = (input: Calendar, datesRange: string[]) => {
	/*  @ts-ignore */
	const tasks = input.tasks.$values
	/*  @ts-ignore */
	const events = input.events.$values
	const outputArray: { [key: string]: { tasks: Task[] | []; events: Event[] | [] } } = {}

	datesRange.map(date => {
		const tasksToDate = tasks.filter(
			(task: {
				calendarDate: string | undefined | null
				softDeadline: string | undefined | null
				hardDeadline: string | undefined | null
			}) =>
				task.calendarDate?.includes(date) ||
				task.softDeadline?.includes(date) ||
				task.hardDeadline?.includes(date)
		)
		const eventsToDate = events.filter((event: { periodStart: string }) => event.periodStart?.includes(date))

		outputArray[date] = { tasks: tasksToDate, events: eventsToDate }
	})

	return outputArray
}

export const groupProjectsByPriority = (projects: Project[] | null | undefined) => {
	const high: Project[] = []
	const low: Project[] = []
	const middle: Project[] = []
	projects?.map(item => {
		item.priority === 3 ? high.push(item) : item.priority === 2 ? middle.push(item) : low.push(item)
	})

	return { high, middle, low }
}
