import { Event } from '@/entities/Event'
import { deleteEvent } from '@/shared/api/eventsRoutes'
import { submitEditedEvent } from '@/widgets/lib/submitForm/submitFunctions'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import { Box, ListItem, styled } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { ListItemActions } from './ListItemAction'

type ListItemEventProps = {
	event: Event
}

export const ListItemEvent = ({ event }: ListItemEventProps) => {
	const currentDate = dayjs(event.periodStart)
	const afterDate = dayjs(event.periodEnd)
	const queryClient = useQueryClient()
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<ListItemWrapper
				sx={{
					background: EventColors[event.type] ?? EventColors['personal'],
					borderRadius: '1em',
					display: 'flex',
				}}
			>
				<Box>
					{`${currentDate.format('HH:mm')}`} - {`${afterDate.format('HH:mm')}`}
				</Box>
				<Box>{event.name}</Box>
				<ListItemActions deleteAction={() => deleteEvent(event.id)} editAction={() => setOpen(true)} />
			</ListItemWrapper>
			<CreateEditEntityModalWindow
				open={open}
				handleClose={() => setOpen(false)}
				type='Event'
				editEntityItem={event}
				submit={values => submitEditedEvent(values, event, queryClient)}
			/>
		</>
	)
}

const EventColors = {
	modeus: 'linear-gradient(to bottom, #446833, #659B4C, #86CE65)',
	personal: 'linear-gradient(to bottom, #336868, #0EA177, #65CEB9)',
}

// const ButtonEvent = styled(Button)({
// 	background: '#282828',
// 	borderRadius: '3em',
// 	color: 'white',
// 	width: '0.3em',
// 	height: '2em',
// 	fontWeight: '1500',
// })
const ListItemWrapper = styled(ListItem)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
})
