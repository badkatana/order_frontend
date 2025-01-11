import { Box, styled } from '@mui/material'

export const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
	display: 'flex',
	flexDirection: 'column',
}

export const BlurredOverlay = styled(Box)({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backdropFilter: 'blur(3px)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})
