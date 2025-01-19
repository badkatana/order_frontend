import { Box } from '@mui/material'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen'

export const ContainerPlaceholder = ({ placeholder = 'Empty', fullHeight = true, progress = false }) => {
	const placeHolder = progress && !placeholder ? 'Empty' : 'Loading'
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
			{progress && <LoadingScreen />}
			{placeHolder}
		</Box>
	)
}
