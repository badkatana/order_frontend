import { Calendar } from '../../entities/Calendar'

export const groupArraysByDate = (input: Calendar) => {
	const output = input.tasks.concat(input.events).reduce((acc, item) => {
		const date = item.calendarDate ?? item.softDeadline ?? item.hardDeadline ?? ''
		if (!acc[date]) {
			acc[date] = { tasks: [], events: [] }
		}

		if (item.hardDeadline || item.softDeadline || item.calendarDate) {
			acc[date].tasks.push(item)
		} else {
			acc[date].events.push(item)
		}
		return acc
	}, {})

	return output
}
