import dayjs from 'dayjs'
import { Calendar } from '../../entities/Calendar'

export const groupArraysByDate = (input: Calendar) => {
	const output = input.tasks.concat(input.events).reduce((acc, item) => {
		const date = item.calendarDate ?? item.softDeadline ?? item.hardDeadline ?? ''
		const formattedDate = dayjs(date).format('MM.DD.YYYY')

		if (!acc[formattedDate]) {
			acc[formattedDate] = { tasks: [], events: [] }
		}

		if ('isPrivate' in item) {
			acc[formattedDate].events.push(item)
		} else {
			acc[formattedDate].tasks.push(item)
		}
		return acc
	}, {})

	return output
}
