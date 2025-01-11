import { Box } from '@mui/material'

export const ContainerPlaceholder = ({ placeholder = 'Empty' }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				color: 'gray',
				fontSize: '1em',
				textAlign: 'center',
			}}
		>
			{placeholder}
		</Box>
	)
}
