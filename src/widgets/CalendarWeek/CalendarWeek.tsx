import { getCalendar } from '@/shared/api'
import { BaseDayCalendar, FileUploadButton } from '@/shared/ui'
import WeekPicker from '@/shared/ui/WeekPeeker'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { generateDateRange, groupArraysByDate } from '../lib'
import { uploadScheduleFromModeus } from '../lib/submitForm'
import { ActionsArea, CalendarWrapper, PageCalendar, UploadButton } from './CalendarStyles'

export const CalendarWeek = () => {
	const [calendarDates, setCalendarDates] = useState({ monday: dayjs(), sunday: dayjs().add(6, 'day') })
	const dateRange = generateDateRange(calendarDates.monday, calendarDates.sunday)

	const { data, isFetching } = useQuery({
		queryKey: ['calendar', calendarDates],
		queryFn: () =>
			getCalendar({
				dateStart: calendarDates?.monday?.format('YYYY-MM-DD').toString(),
				dateEnd: calendarDates?.sunday?.format('YYYY-MM-DD').toString(),
			}),
	})

	const calendarItem = !isFetching && groupArraysByDate(data, dateRange)

	return (
		<PageCalendar>
			<ActionsArea>
				<FileUploadButton
					onUpload={uploadScheduleFromModeus}
					buttonText='Upload Schedule'
					accept='.ics'
					buttonStyle={UploadButton}
				/>
				<WeekPicker
					onChange={(startDate, endDate) => setCalendarDates({ monday: startDate, sunday: endDate })}
				/>
			</ActionsArea>

			<CalendarWrapper>
				{!isFetching &&
					dateRange.map(date => {
						return (
							<BaseDayCalendar
								/*  @ts-ignore */
								tasks={calendarItem[date] ? calendarItem[date].tasks : []}
								/*  @ts-ignore */
								events={calendarItem[date] ? calendarItem[date].events : []}
								key={date}
								date={date}
							/>
						)
					})}
			</CalendarWrapper>
		</PageCalendar>
	)
}
