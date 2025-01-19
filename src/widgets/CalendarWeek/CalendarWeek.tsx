import { useAppStore } from '@/app'
import { getCalendar } from '@/shared/api'
import { BaseDayCalendar, ContainerPlaceholder, FileUploadButton } from '@/shared/ui'
import WeekPicker from '@/shared/ui/WeekPeeker'
import { useQuery } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'
import { generateDateRange, groupArraysByDate } from '../lib'
import { uploadScheduleFromModeus } from '../lib/submitForm'
import { ActionsArea, CalendarWrapper, PageCalendar, UploadButton } from './CalendarStyles'

export const CalendarWeek = () => {
	const { savedWeek, setSavedWeek } = useAppStore()
	const dateRange = generateDateRange(savedWeek.monday, savedWeek.sunday)

	const { data, isFetching } = useQuery({
		queryKey: ['calendar', savedWeek],
		queryFn: () =>
			getCalendar({
				dateStart: (savedWeek?.monday as Dayjs).format('YYYY-MM-DD').toString(),
				dateEnd: (savedWeek?.sunday as Dayjs).format('YYYY-MM-DD').toString(),
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
				<WeekPicker onChange={(monday, sunday) => setSavedWeek({ monday, sunday })} />
			</ActionsArea>

			<CalendarWrapper>
				{!isFetching ? (
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
					})
				) : (
					<ContainerPlaceholder fullHeight progress />
				)}
			</CalendarWrapper>
		</PageCalendar>
	)
}
