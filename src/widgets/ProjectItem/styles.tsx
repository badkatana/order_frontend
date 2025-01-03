import { Box, styled } from '@mui/material'

export const Card = styled(Box)({
	background: '#f3f3f3',
	borderRadius: '12px',
	padding: '16px',
	boxShadow: ' 0 2px 8px rgba(0, 0, 0, 0.1)',
	fontFamily: 'Arial, sans-serif',
	maxWidth: '300px',
})

export const Header = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	fontSize: '14px',
	color: '#666',
})

export const Status = styled(Box)({
	display: 'flex',
	alignItems: 'center',

	'.status-icon': {
		marginRight: '8px',
	},
})

export const Creator = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	img: {
		width: '20px',
		height: '20px',
		borderRadius: '50%',
		marginLeft: '8px',
	},
})

export const Content = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	margin: '16px 0',
	'.task-icon': {
		width: '40px',
		height: '40px',
		marginRight: '12px',
	},
	h3: {
		fontSize: '16px',
		fontWeight: 'bold',
		color: ' #333',
	},
})

export const ProgressBarWrapper = styled(Box)({
	background: '#e0e0e0',
	borderRadius: '8px',
	height: '6px',
	overflow: 'hidden',
})

export const ProgressBar = styled(Box)<{ width: number }>(width => ({
	height: '100%',
	background: '#4caf50',
	width: ` ${width}%`,
}))
