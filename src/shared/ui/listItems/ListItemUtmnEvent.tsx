import { addEventToCalender } from '@/shared/api/utmnRoutes'
import { Box, Divider, styled, Typography } from '@mui/material'
import 'dayjs/locale/ru'
import { AddCircleButton } from '../AddCircleButton/AddCircleButton'

interface ListItemUtmnEventProps {
	event: string
}

export const ListItemUtmnEvent = ({ event }: ListItemUtmnEventProps) => {
	const [datePart, ...rest] = event.split(':')
	const title = rest.join(':').trim()

	return (
		<Wrapper>
			<Box display='flex' flexDirection='column' flex={1}>
				<Typography fontSize='1.2em' fontWeight={600}>
					{title}
				</Typography>
				<Typography fontStyle='italic' color='grey'>
					{datePart}
				</Typography>
			</Box>

			<RightSection>
				<Divider orientation='vertical' variant='middle' flexItem sx={{ margin: '1em' }} />
				<AddCircleButton onClick={() => addEventToCalender(event)} tooltip='Добавить в календарь' />
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
