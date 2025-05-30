import { useAppStore } from '@/app'
import { getCalendar } from '@/shared/api'
import { WithPageWrapper } from '@/shared/ui/WithPageWrapper/WithPageWrapper'
import { CalendarWeekView } from '@/widgets'
import { WeekOverview } from '@/widgets/calendarWeekView/weekOverview/WeekOverview'
import { generateDateRange, groupArraysByDate } from '@/widgets/lib'
import { CreateTaskEventModalWindow } from '@/widgets/modals'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

export const CalendarPage = () => {
	const { savedWeek } = useAppStore()
	const dateRange = generateDateRange(savedWeek.monday, savedWeek.sunday)
	const [open, setOpen] = useState(false)

	const { data } = useQuery({
		queryKey: ['calendar', savedWeek],
		queryFn: () =>
			getCalendar({
				dateStart: (savedWeek?.monday as Dayjs).format('YYYY-MM-DD').toString(),
				dateEnd: (savedWeek?.sunday as Dayjs).format('YYYY-MM-DD').toString(),
			}),
	})

	const calendarItem = groupArraysByDate(data, dateRange)

	return (
		<WithPageWrapper>
			<Box
				sx={{
					marginTop: '1em',
					minWidth: '100%',
					minHeight: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<WeekOverview calendarItem={calendarItem} setOpen={setOpen} />
				<CalendarWeekView calendarItem={calendarItem} dateRange={dateRange} />
			</Box>
			<CreateTaskEventModalWindow open={open} handleClose={() => setOpen(!open)} />
		</WithPageWrapper>
	)
}
