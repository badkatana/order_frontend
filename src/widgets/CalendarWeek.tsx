import { createTheme, ThemeProvider } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { getCalendar } from '../shared/api/calendarRoutes'
import { BaseDayCalendar } from '../shared/ui'
import WeekPicker from '../shared/ui/WeekPeeker'
import { generateDateRange, groupArraysByDate } from './lib'
import { CalendarWrapper, PageCalendar } from './styles/CalendarStyles'

export const CalendarWeek = () => {
	const [calendarDates, setCalendarDates] = useState({ monday: dayjs(), sunday: dayjs().add(6, 'day') })

	const dateRange = generateDateRange(calendarDates.monday, calendarDates.sunday)

	const { data: calendarItem, isFetching } = useQuery({
		queryKey: ['calendar', calendarDates],
		queryFn: () =>
			getCalendar({
				dateStart: calendarDates?.monday?.format('YYYY-MM-DD').toString(),
				dateEnd: calendarDates?.sunday?.format('YYYY-MM-DD').toString(),
			}),
	})

	const daysTasks = !isFetching && groupArraysByDate(calendarItem, dateRange)

	return (
		<ThemeProvider theme={theme}>
			<PageCalendar>
				<WeekPicker
					onChange={(startDate, endDate) => setCalendarDates({ monday: startDate, sunday: endDate })}
				/>

				<CalendarWrapper>
					{!isFetching &&
						dateRange.map(date => {
							return (
								<BaseDayCalendar
									tasks={daysTasks[date] ? daysTasks[date].tasks : []}
									events={daysTasks[date] ? daysTasks[date].events : []}
									key={date}
									date={date}
								/>
							)
						})}
				</CalendarWrapper>
			</PageCalendar>
		</ThemeProvider>
	)
}

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#000',
			paper: '#000',
		},
		text: {
			primary: '#fff',
		},
	},
})
