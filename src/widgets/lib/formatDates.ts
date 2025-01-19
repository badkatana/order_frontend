import { Task } from '@/entities/Task'
import { DATE_FORMAT } from '@/shared/constants/constants'
import { Dayjs } from 'dayjs'

/*  @ts-ignore */
export const generateDateRange = (start, end) => {
	/*  @ts-ignore */
	const dates = []
	let currentDate = start

	/*  @ts-ignore */
	if (!currentDate) return dates

	while (currentDate.isBefore(end) || currentDate.isSame(end)) {
		dates.push(currentDate.format('YYYY-MM-DD'))
		currentDate = currentDate.add(1, 'day')
	}

	return dates
}

export const formatDateForDB = (date: any, dateFormat: string) => {
	return (date as Dayjs)?.format(dateFormat)
}

export const formatDatesTask = (task: Task) => {
	const hardDeadline = formatDateForDB(task.hardDeadline, DATE_FORMAT)
	const softDeadline = formatDateForDB(task.softDeadline, DATE_FORMAT)
	const calendarDate = formatDateForDB(task.calendarDate, DATE_FORMAT)
	return { ...task, hardDeadline, softDeadline, calendarDate }
}
