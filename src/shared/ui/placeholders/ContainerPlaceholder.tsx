import { Box } from '@mui/material'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen'

export const ContainerPlaceholder = ({
	placeholder = 'Empty',
	fullHeight = true,
	progress = false,
	sx = undefined,
}) => {
	const placeHolder = progress ? 'Loading' : placeholder === 'Empty' ? 'Empty' : placeholder
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: fullHeight ? '100%' : '50%',
				color: 'gray',
				fontSize: '1em',
				textAlign: 'center',
				// @ts-ignore
				...sx,
			}}
		>
			{progress && <LoadingScreen />}
			{placeHolder}
		</Box>
	)
}
