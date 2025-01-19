import { addEventToCalender } from '@/shared/api/utmnRoutes'
import { Box, Divider, ListItemText, styled } from '@mui/material'
import { AddCircleButton } from '../AddCircleButton/AddCircleButton'

type ListItemUtmnEventProps = {
	event: {
		topic: string
		category: string
		date: string | null | undefined
		original: string
	}
}
export const ListItemUtmnEvent = ({ event }: ListItemUtmnEventProps) => {
	return (
		<Wrapper>
			<Box display={'flex'} flexDirection={'column'} flex={1}>
				<ListItemText>{event.topic} </ListItemText>
				<ListItemText>{event.date}</ListItemText>
			</Box>
			<RightSection>
				<Divider orientation='vertical' variant='middle' flexItem sx={{ margin: '1em' }} />
				<AddCircleButton
					onClick={() => addEventToCalender(event.original)}
					tooltip={'add event to a calender'}
				/>
			</RightSection>
		</Wrapper>
	)
}

const Wrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	flex: '1 1 30%',
	borderStyle: 'solid',
	borderColor: '#606162',
	borderRadius: '1em',
	padding: '1em',
	width: '88%',
	marginBottom: '1em',
})

const RightSection = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	width: '15%',
})
