import { Button, Typography } from '@mui/material'
import { getIcon } from '../icons/icons'

// @ts-ignore
export const CustomIconButton = ({ iconName, onClick, title = undefined, ...props }) => {
	const storedIcon = getIcon({ name: iconName })
	const { sx, ...restProps } = props

	return (
		// @ts-ignore
		<Button
			onClick={onClick}
			sx={{
				'& svg': {
					fontSize: 18,
				},
				color: 'white',
				...sx,
			}}
			{...restProps}
		>
			{storedIcon}
			{title && <Typography marginLeft={0.5}>{title}</Typography>}
		</Button>
	)
}
