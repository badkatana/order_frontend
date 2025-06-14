import { Calendar } from '@/entities/Calendar'
import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { CALENDAR_ITEM } from '@/shared/constants/constants'

export const groupArraysByDate = (input: Calendar, datesRange: string[]): CALENDAR_ITEM => {
	if (!input) return {}
	const tasks = input.tasks
	const events = input.events
	const outputArray: CALENDAR_ITEM = {}

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

export const groupByPriority = (projects: Project[] | null | undefined | Task[]) => {
	const high: Project[] | Task[] = []
	const low: Project[] | Task[] = []
	const middle: Project[] | Task[] = []
	projects?.map(item => {
		if (Object.keys(item).length < 1) return
		item.priority === 3 ? low.push(item) : item.priority === 2 ? middle.push(item) : high.push(item)
	})

	return { high, middle, low }
}
