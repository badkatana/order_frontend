import dayjs, { Dayjs } from 'dayjs'

export const getFormattedDateOrNull = (date: string | null | undefined): Dayjs | null => {
	const parsedDate = dayjs(date)
	return parsedDate.isValid() ? parsedDate : null
}
