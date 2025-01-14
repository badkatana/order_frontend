import { Box } from '@mui/material'

export const ContainerPlaceholder = ({ placeholder = 'Empty', fullHeight = true }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: fullHeight ? '100%' : '50%',
				color: 'gray',
				fontSize: '1em',
				textAlign: 'center',
			}}
		>
			{placeholder}
		</Box>
	)
}
