import dayjs, { Dayjs } from 'dayjs'

export const getFormattedDateOrNull = (date: string | null | undefined): Dayjs | null => {
	const parsedDate = dayjs(date)
	console.log(parsedDate)
	return parsedDate.isValid() ? parsedDate : null
}
