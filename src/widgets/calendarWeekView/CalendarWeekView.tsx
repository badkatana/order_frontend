import { CALENDAR_ITEM, SCROLLBAR } from '@/shared/constants/constants'
import { DayWeek } from '@/widgets/calendarWeekView/day/DayWeek'
import { Box, useTheme } from '@mui/material'

export const CalendarWeekView = ({ calendarItem, dateRange }: { calendarItem: CALENDAR_ITEM; dateRange: string[] }) => {
	const theme = useTheme()
	const styles = {
		background: `linear-gradient(to right,${theme.palette.custom.calendar.gradient.first} , ${theme.palette.custom.calendar.gradient.second})`,
		width: '72%',
		borderRadius: '2em',
		padding: '1em',
		height: '85vh',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
		marginRight: '1em',
	}

	return (
		<Box sx={styles}>
			<Box
				sx={{
					flex: 1,
					overflowY: 'auto',
					display: 'flex',
					flexDirection: 'row',
					borderRadius: '1em',
					...SCROLLBAR,
				}}
			>
				<DayWeek isTimeColumn />
				{dateRange.map(date => (
					<DayWeek key={date} date={date} events={calendarItem[date]?.events} />
				))}
			</Box>
		</Box>
	)
}
