import { Calendar } from '@/entities/Calendar'
import { Project } from '@/entities/Project'
import { CALENDAR_ITEM } from '@/shared/constants/constants'

export const groupArraysByDate = (input: Calendar, datesRange: string[]): CALENDAR_ITEM => {
	if (!input) return {}
	const tasks = input.tasks.$values
	const events = input.events.$values
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

export const groupProjectsByPriority = (projects: Project[] | null | undefined) => {
	const high: Project[] = []
	const low: Project[] = []
	const middle: Project[] = []
	projects?.map(item => {
		item.priority === 3 ? low.push(item) : item.priority === 2 ? middle.push(item) : high.push(item)
	})

	console.log(projects, high, middle, low)
	return { high, middle, low }
}
