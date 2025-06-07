import { Button, Typography } from '@mui/material'
import { getIcon } from '../icons/icons'

// @ts-ignore
export const CustomIconButton = ({ iconName, onClick, title = undefined, ...props }) => {
	const storedIcon = getIcon({ name: iconName })

	return (
		// @ts-ignore
		<Button onClick={onClick} color='white' {...props}>
			{storedIcon}
			{title && <Typography marginLeft={0.5}>{title}</Typography>}
		</Button>
	)
}
