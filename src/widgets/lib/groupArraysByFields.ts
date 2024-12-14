import dayjs from 'dayjs'
import { Calendar } from '../../entities/Calendar'

export const groupArraysByDate = (input: Calendar) => {
	const tasks = input.tasks.$values
	const events = input.events.$values

	const output = tasks.concat(events).reduce((acc, item) => {
		const date = item.callendarDate ?? item.softDeadline ?? item.hardDeadline ?? ''
		const formattedDate = dayjs(date).format('YYYY-MM-DD')

		if (!acc[formattedDate]) {
			acc[formattedDate] = { tasks: [], events: [] }
		}

		if ('hardDeadline' in item) {
			acc[formattedDate].tasks.push(item)
		} else {
			acc[formattedDate].events.push(item)
		}
		return acc
	}, {})

	return output
}
