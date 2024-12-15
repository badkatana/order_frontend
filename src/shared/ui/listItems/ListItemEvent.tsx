import { Box, Button, ListItem, styled } from '@mui/material'
import dayjs from 'dayjs'
import { Event } from '../../../entities/Event'

type ListItemEventProps = {
	event: Event
}

export const ListItemEvent = (props: ListItemEventProps) => {
	const { event } = props
	const currentDate = dayjs(event.periodStart)
	const afterDate = dayjs(event.periodEnd)

	return (
		<ListItemWrapper sx={{ background: EventColors[event.type] ?? EventColors['personal'], borderRadius: '1em' }}>
			<Box>{`${currentDate.hour()} : ${currentDate.minute()}`}</Box>
			<Box marginLeft={'0.5em'}>{`${afterDate.hour()} : ${afterDate.minute()}`}</Box>
			<Box>{event.name}</Box>
			<Box marginLeft={'auto'}>
				<ButtonEvent size='small'>...</ButtonEvent>
			</Box>
		</ListItemWrapper>
	)
}

const EventColors = {
	lecture: 'linear-gradient(to bottom, #446833, #659B4C, #86CE65)',
	personal: 'linear-gradient(to bottom, #336868, #0EA177, #65CEB9)',
}

const ButtonEvent = styled(Button)({
	background: '#282828',
	borderRadius: '3em',
	color: 'white',
	width: '0.3em',
	height: '2em',
	fontWeight: '1500',
})
const ListItemWrapper = styled(ListItem)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
})
