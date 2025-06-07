import { useAppStore } from '@/app'
import { Event } from '@/entities/Event'
import { useManageEvents } from '@/features/calendar/event/useManageEvents'
import { useRenderEvents } from '@/features/calendar/event/useRenderEvents'
import { DATE_FORMAT } from '@/shared/constants/constants'
import { DateHeader } from '@/shared/ui/DateHeader'
import { submitEvent } from '@/widgets/lib/submitForm'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

type DayWeekProps = {
	date?: string | undefined
	events?: Event[] | undefined | any[]
	isTimeColumn?: boolean
}

const slotHeight = 3
const totalSlots = 36

export const DayWeek = ({ date, events, isTimeColumn = false }: DayWeekProps) => {
	const { setSavedDate, savedDate } = useAppStore()
	const [openModal, setOpenModal] = useState(false)
	const { handleOpenContextMenu, EventContextMenuModal, EventCreateEditModal } = useManageEvents()

	const renderedEvents = useRenderEvents(events || [], handleOpenContextMenu)

	return (
		<Box
			sx={{
				userSelect: 'none',
				display: 'flex',
				flexDirection: 'column',
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
					...(savedDate.format(DATE_FORMAT) === date && {
						backgroundColor: 'white',
						color: 'purple',
					}),
				}}
			>
				{!isTimeColumn ? (
					<>
						<DateHeader date={date} />
					</>
				) : (
					'Time'
				)}
			</Button>

			<Box
				sx={{
					flex: 1,
					position: 'relative',
					height: `${3 * 36}em`,
					overflow: 'hidden',
				}}
			>
				{[...Array(totalSlots)].map((_, i) => (
					<Box
						key={i}
						onClick={e => handleOpenContextMenu(e, date, undefined)}
						sx={{
							height: `${slotHeight}rem`,
							backgroundColor: '#1e1e22',
							borderTop: '0.05em dashed gray',
							borderLeft: '0.1em solid gray',
							borderRight: '0.1em solid gray',
							paddingLeft: '8px',
							fontSize: '0.8em',
							display: 'flex',
							position: 'relative',
							alignItems: 'center',
							fontWeight: '600',
							color: 'white',
							...(i % 2 !== 0 && { borderTop: '0.05em solid gray' }),
						}}
					>
						<Typography fontWeight={'light'} fontSize={'0.9em'}>
							{isTimeColumn && (i % 2 === 0 ? `${6 + i / 2}:00` : `${6 + Math.floor(i / 2)}:30`)}
						</Typography>
					</Box>
				))}

				{renderedEvents}
				{EventContextMenuModal}
				{EventCreateEditModal}
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
