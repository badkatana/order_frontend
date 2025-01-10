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

export const ActionsArea = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	width: '98%',
	alignItems: 'flex-end',
	paddingBottom: '1em',
	paddingTop: '0.5em',
	justifyContent: 'flex-end',
	gap: '1em',
})

export const UploadButton = {
	backgroundColor: '#989488',
}
