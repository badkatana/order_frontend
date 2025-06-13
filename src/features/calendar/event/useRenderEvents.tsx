import { Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'

const slotHeight = 3 // 3rem
const startHour = 6 // день начинается с 6:00

export const useRenderEvents = (events: Event[], handleOpenContextMenu) => {
	return events.map(event => {
		const start = dayjs(event.periodStart)
		const end = dayjs(event.periodEnd)

		const dayStart = start.startOf('day').add(startHour, 'hour')

		const effectiveStart = start.isBefore(dayStart) ? dayStart : start

		const minutesFromStart = effectiveStart.diff(dayStart, 'minute')
		const durationInMinutes = end.diff(effectiveStart, 'minute')

		if (durationInMinutes <= 0) return null

		const slotOffset = minutesFromStart / 30
		const topEm = slotOffset * slotHeight
		const heightEm = (durationInMinutes / 30) * slotHeight

		return (
			<Paper
				onClick={e => handleOpenContextMenu(e, undefined, event)}
				key={event.eventId}
				sx={{
					position: 'absolute',
					top: `${topEm}rem`,
					height: `${heightEm}rem`,
					left: 0,
					width: '100%',
					bgcolor: 'primary.dark',
					opacity: 0.9,
					p: 0.5,
					fontSize: 12,
					zIndex: 5,
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					cursor: 'pointer',
					userSelect: 'none',
					borderRadius: 1,
					textWrap: 'wrap',
					boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
				}}
			>
				<Typography variant='caption' sx={{ fontWeight: 'bold' }}>
					{start.format('HH:mm')} – {end.format('HH:mm')}
				</Typography>
				<Typography>{event.name}</Typography>
			</Paper>
		)
	})
}
