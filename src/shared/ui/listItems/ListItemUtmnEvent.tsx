import { addEventToCalender } from '@/shared/api/utmnRoutes'
import { Box, Divider, styled, Typography } from '@mui/material'
import 'dayjs/locale/ru'
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
				<Typography fontSize={'1.2em'}>{event.topic} </Typography>
				<Typography fontStyle={'italic'} color='grey'>
					{event.date}
				</Typography>
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
