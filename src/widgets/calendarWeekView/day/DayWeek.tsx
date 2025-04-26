import { useAppStore } from '@/app'
import { Event } from '@/entities/Event'
import { DATE_FORMAT } from '@/shared/constants/constants'
import { DateHeader } from '@/shared/ui/DateHeader'
import { submitEvent } from '@/widgets/lib/submitForm'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import { Box, Button, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'

type DayWeekProps = {
	date?: string | undefined
	events?: Event[] | undefined | any[]
	isTimeColumn?: boolean
}

export const DayWeek = ({ date, events, isTimeColumn = false }: DayWeekProps) => {
	const { setSavedDate, savedDate } = useAppStore()
	const [selection, setSelection] = useState<{ startY: number; endY: number } | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const handleMouseDown = (e: React.MouseEvent) => {
		const rect = containerRef.current?.getBoundingClientRect()
		if (!rect) return
		const startY = e.clientY - rect.top
		setSelection({ startY, endY: startY })
		setIsDragging(true)
	}
	const snapToBlock = (y: number) => {
		const blockHeight = 32
		return Math.round(y / blockHeight) * blockHeight
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !selection) return
		const rect = containerRef.current?.getBoundingClientRect()
		if (!rect) return
		const rawY = e.clientY - rect.top
		const snappedY = snapToBlock(rawY)
		setSelection({ ...selection, endY: snappedY })
	}

	const pxToTime = (y: number) => {
		const blockHeightPx = 32
		const totalBlocks = Math.floor(y / blockHeightPx)
		const hours = Math.floor(totalBlocks / 2) + 6
		const minutes = totalBlocks % 2 === 0 ? 0 : 30
		return { hours, minutes }
	}

	const handleMouseUp = () => {
		if (!isDragging || !selection) return

		const start = Math.min(selection.startY, selection.endY)
		const end = Math.max(selection.startY, selection.endY)

		const snappedStart = snapToBlock(start)
		const snappedEnd = snapToBlock(end)

		const startTime = pxToTime(snappedStart)
		const endTime = pxToTime(snappedEnd)

		const newEvent = {
			id: Date.now(),
			startY: snappedStart,
			endY: snappedEnd,
			startTime,
			endTime,
		}

		console.log(newEvent)
		// setEvents(prev => [...prev, newEvent])
		setSelection(null)
		setIsDragging(false)
	}

	return (
		<Box
			ref={containerRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			sx={{
				userSelect: 'none',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				height: 'fit-content',
				...(isTimeColumn && { width: '3.5em', minWidth: '3.5em' }),
				...(!isTimeColumn && { flex: 1 }),
			}}
		>
			<Button
				onClick={() => setSavedDate(dayjs(date))}
				disabled={isTimeColumn}
				sx={{
					height: '4em',
					display: 'flex',
					position: 'sticky',
					marginBottom: '1em',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					fontWeight: 600,
					top: 0,
					zIndex: 2,
					borderRadius: '0.5em',
					cursor: 'pointer',
					color: 'black',
					backgroundColor: 'rgb(87, 86, 84, 0.5)',
					...(isTimeColumn && { width: '2em' }),
					...(savedDate.format(DATE_FORMAT) === date && { backgroundColor: 'white', color: 'purple' }),
				}}
			>
				{!isTimeColumn ? <DateHeader date={date} /> : 'Time'}
			</Button>

			<Box sx={{ position: 'relative', flex: 1 }}>
				{/* Time grid */}
				{[...Array(38)].map((_, halfHourIndex) => (
					<Box
						key={halfHourIndex}
						sx={{
							height: '2em',
							backgroundColor: '#1e1e22',
							borderTop: '0.05em dashed gray',
							borderLeft: '0.1em solid gray',
							borderRight: '0.1em solid gray',
							paddingLeft: '8px',
							fontSize: '0.8em',
							display: 'flex',
							alignItems: 'center',
							fontWeight: '600',
							color: 'white',
							...(halfHourIndex % 2 !== 0 && { borderTop: '0.05em solid gray' }),
						}}
					>
						<Typography fontWeight={'bold'}>
							{isTimeColumn &&
								(halfHourIndex % 2 === 0
									? `${6 + halfHourIndex / 2}:00`
									: `${6 + Math.floor(halfHourIndex / 2)}:30`)}
						</Typography>
					</Box>
				))}

				{/* Selection highlight */}
				{selection && (
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

				{/* Render events */}
				{events?.map(userEvent => (
					<Paper
						key={userEvent.id}
						sx={{
							position: 'absolute',
							top: `${userEvent.startY}px`,
							height: `${userEvent.endY - userEvent.startY}px`,
							left: '10%',
							width: '80%',
							bgcolor: 'primary.light',
							opacity: 0.8,
							padding: 0.5,
							fontSize: 12,
						}}
					>
						{`${userEvent.startTime.hours}:${userEvent.startTime.minutes.toString().padStart(2, '0')} - ${
							userEvent.endTime.hours
						}:${userEvent.endTime.minutes.toString().padStart(2, '0')}`}
					</Paper>
				))}
			</Box>

			<CreateEditEntityModalWindow
				open={openModal}
				type='Event'
				method='create'
				submit={submitEvent}
				handleClose={() => setOpenModal(!openModal)}
			/>
		</Box>
	)
}
