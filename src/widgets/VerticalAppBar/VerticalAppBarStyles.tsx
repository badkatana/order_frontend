import { Box, styled } from '@mui/material'

export const BlurredBackground = styled(Box)<{ open: boolean }>(({ open }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backdropFilter: open ? 'blur(20px)' : 'none',
	zIndex: open ? 2 : -999,
	transition: 'backdrop-filter 0.3s',
	pointerEvents: open ? 'auto' : 'none',
}))

export const VerticalBar = {
	transition: 'width 0.3s',
	backgroundColor: 'black',
	height: '100%',
}
