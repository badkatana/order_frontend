import { CALENDAR_ITEM } from '@/shared/constants/constants'
import { DayWeek } from '@/widgets/calendarWeekView/day/DayWeek'
import { Box } from '@mui/material'

export const CalendarWeekView = ({ calendarItem, dateRange }: { calendarItem: CALENDAR_ITEM; dateRange: string[] }) => {
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

	return (
		<Box sx={styles}>
			<Box
				sx={{
					flex: 1,
					overflowY: 'auto',
					display: 'flex',
					flexDirection: 'row',
					borderRadius: '1em',
					'&::-webkit-scrollbar': {
						width: '8px',
					},
					'&::-webkit-scrollbar-track': {
						backgroundColor: 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#c1c1c1',
						borderRadius: '8px',
						border: '2px solid transparent',
						backgroundClip: 'padding-box',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#a0a0a0',
					},
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
