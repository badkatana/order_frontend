import { Box, styled } from '@mui/material'

export const CalendarWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	padding: '1em',
	overflowX: 'auto',
	overflowY: 'hidden',
	maxWidth: '100%',
})

export const PageCalendar = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
})
