import { useAppStore } from '@/app'
import { getCalendar } from '@/shared/api'
import { getOverview } from '@/shared/api/calendarRoutes'
import { WithPageWrapper } from '@/shared/ui/WithPageWrapper/WithPageWrapper'
import { CalendarWeekView } from '@/widgets'
import { WeekOverview } from '@/widgets/calendarWeekView/weekOverview/WeekOverview'
import { generateDateRange, groupArraysByDate } from '@/widgets/lib'
import { submitTask } from '@/widgets/lib/submitForm'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'
import { useMemo, useState } from 'react'

export const CalendarPage = () => {
	const { savedWeek } = useAppStore()
	const dateRange = generateDateRange(savedWeek.monday, savedWeek.sunday)
	const [open, setOpen] = useState(false)

	const { data, refetch } = useQuery({
		queryKey: ['calendar', savedWeek],
		queryFn: () =>
			getCalendar({
				dateStart: (savedWeek?.monday as Dayjs).format('YYYY-MM-DD').toString(),
				dateEnd: (savedWeek?.sunday as Dayjs).format('YYYY-MM-DD').toString(),
			}),
	})

	const { data: overview } = useQuery({
		queryKey: ['overview', savedWeek],
		queryFn: getOverview,
		refetchInterval: Infinity,
	})

	const calendarItem = useMemo(() => groupArraysByDate(data, dateRange), [data, dateRange])

	const submitFunction = async values => {
		await submitTask(values)
		handleClose()
	}

	const handleClose = () => {
		refetch()
		setOpen(!open)
	}

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
				<WeekOverview calendarItem={calendarItem} setOpen={setOpen} overview={overview} />
				<CalendarWeekView calendarItem={calendarItem} dateRange={dateRange} />
			</Box>
			<CreateEditEntityModalWindow
				type={'Task'}
				submit={submitFunction}
				open={open}
				handleClose={handleClose}
				sx={{ maxWidth: '50em', display: 'flex', flexDirection: 'column' }}
			/>
		</WithPageWrapper>
	)
}
