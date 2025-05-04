import { Box, Paper, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'

interface Event {
	id: number
	dayIndex: number // 0 (Monday) - 6 (Sunday)
	startY: number
	endY: number
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const WeekViewCalendar: React.FC = () => {
	const [events, setEvents] = useState<Event[]>([])
	const [selection, setSelection] = useState<{ dayIndex: number; startY: number; endY: number } | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)

	const handleMouseDown = (e: React.MouseEvent, dayIndex: number) => {
		const rect = containerRef.current?.getBoundingClientRect()
		if (!rect) return
		const startY = e.clientY - rect.top
		setSelection({ dayIndex, startY, endY: startY })
		setIsDragging(true)
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !selection) return
		const rect = containerRef.current?.getBoundingClientRect()
		if (!rect) return
		const endY = e.clientY - rect.top
		setSelection({ ...selection, endY })
	}

	const handleMouseUp = () => {
		if (!isDragging || !selection) return
		const newEvent: Event = {
			id: Date.now(),
			dayIndex: selection.dayIndex,
			startY: Math.min(selection.startY, selection.endY),
			endY: Math.max(selection.startY, selection.endY),
		}
		setEvents(prev => [...prev, newEvent])
		setSelection(null)
		setIsDragging(false)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				// borderTop: '1px solid #ccc',
				// borderLeft: '1px solid #ccc',
				userSelect: 'none',
			}}
			ref={containerRef}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			height='800px'
		>
			{daysOfWeek.map((day, dayIndex) => (
				<Box
					key={day}
					sx={{
						flex: 1,
						borderRight: '1px solid #ccc',
						position: 'relative',
						backgroundColor: '#f9f9f9',
					}}
					onMouseDown={e => handleMouseDown(e, dayIndex)}
				>
					{/* Название дня */}
					<Typography sx={{ textAlign: 'center', py: 1, fontWeight: 'bold' }}>{day}</Typography>

					{/* Часы */}
					{[...Array(12)].map((_, hour) => (
						<Box
							key={hour}
							sx={{
								position: 'absolute',
								top: `${(hour * (800 - 40)) / 12 + 40}px`,
								left: 0,
								right: 0,
								color: 'black',
								borderTop: '1px dashed #ddd',
								fontSize: '10px',
								pl: 1,
							}}
						>
							{8 + hour}:00
						</Box>
					))}

					{/* События */}
					{events
						.filter(event => event.dayIndex === dayIndex)
						.map(event => (
							<Paper
								key={event.id}
								sx={{
									position: 'absolute',
									top: `${event.startY}px`,
									height: `${event.endY - event.startY}px`,
									left: '10%',
									width: '80%',
									bgcolor: 'primary.light',
									opacity: 0.8,
									padding: 0.5,
									fontSize: 12,
								}}
							>
								Event
							</Paper>
						))}

					{/* Отрисовка выделения */}
					{selection && selection.dayIndex === dayIndex && (
						<Box
							sx={{
								position: 'absolute',
								top: `${Math.min(selection.startY, selection.endY)}px`,
								height: `${Math.abs(selection.endY - selection.startY)}px`,
								left: '10%',
								width: '80%',
								bgcolor: 'primary.main',
								opacity: 0.3,
							}}
						/>
					)}
				</Box>
			))}
		</Box>
	)
}
