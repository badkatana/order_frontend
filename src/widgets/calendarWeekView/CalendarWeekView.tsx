import { CALENDAR_ITEM, SCROLLBAR } from '@/shared/constants/constants'
import { DayWeek } from '@/widgets/calendarWeekView/day/DayWeek'
import { Box } from '@mui/material'

export const CalendarWeekView = ({ calendarItem, dateRange }: { calendarItem: CALENDAR_ITEM; dateRange: string[] }) => {
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

const styles = {
	background: 'linear-gradient(to right, #e6f970, #cbe2ec)',
	width: '70%',
	borderRadius: '2em',
	padding: '1em',
	height: '85vh',
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
}
