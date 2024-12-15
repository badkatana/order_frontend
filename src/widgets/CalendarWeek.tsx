import { Box, createTheme, TextField, ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { getCalendar } from '../shared/api/calendarRoutes'
import { BaseDayCalendar } from '../shared/ui/BaseDayCalendar'
import { generateDateRange } from './lib'
import { groupArraysByDate } from './lib/groupArraysByFields'
import { CalendarWrapper, PageCalendar } from './styles/CalendarStyles'

export const CalendarWeek = () => {
	const [startDate, setStartDate] = useState(dayjs())
	const [endDate, setEndDate] = useState(dayjs().add(6, 'days'))

	const dateRange = generateDateRange(startDate, endDate)

	const { data: calendarItem, isFetching } = useQuery({
		queryKey: ['calendar', startDate],
		queryFn: () =>
			getCalendar({
				dateStart: startDate.format('YYYY-MM-DD').toString(),
				dateEnd: endDate.format('YYYY-MM-DD').toString(),
			}),
	})

	const daysTasks = !isFetching && groupArraysByDate(calendarItem, dateRange)

	const handleStartDateChange = date => {
		setStartDate(date)
		if (date) {
			setEndDate(date.add(6, 'days'))
		} else {
			setEndDate(null)
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<PageCalendar>
				<Box sx={{ width: '15em', marginTop: '2%', marginLeft: '2%' }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label='Выберите начало недели'
							value={startDate}
							onChange={handleStartDateChange}
							renderInput={params => (
								<TextField
									{...params}
									variant='outlined'
									sx={{
										width: '10em',
										input: {
											color: 'white',
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
											},
											'&:hover fieldset': {
												borderColor: 'white',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'white', // Цвет границы при фокусе
											},
										},
									}}
								/>
							)}
						/>
					</LocalizationProvider>
				</Box>

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
