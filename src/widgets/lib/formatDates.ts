import { Task } from '@/entities/Task'
import { DATE_FORMAT, DefaultDate } from '@/shared/constants/constants'
import dayjs, { Dayjs } from 'dayjs'

export const generateDateRange = (start: DefaultDate, end: DefaultDate) => {
	const dates: string[] = []
	let currentDate = start as Dayjs

	if (!currentDate) return dates

	while (currentDate.isBefore(end) || currentDate.isSame(end)) {
		dates.push(currentDate.format(DATE_FORMAT))
		currentDate = currentDate.add(1, 'day')
	}

	return dates
}

export const formatDateForDB = (date: any, dateFormat: string) => {
	if (date === '' || !date) return null
	if (dayjs(date).isValid()) return dayjs(date).format(dateFormat)
}

export const formatDatesTask = (task: Task) => {
	const hardDeadline = formatDateForDB(task.hardDeadline, DATE_FORMAT)
	const softDeadline = formatDateForDB(task.softDeadline, DATE_FORMAT)
	const calendarDate = formatDateForDB(task.calendarDate, DATE_FORMAT)
	return { ...task, hardDeadline, softDeadline, calendarDate }
}
