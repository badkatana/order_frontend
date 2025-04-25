import { Button } from '@mui/material'
import { getIcon } from '../icons/icons'

export const CustomIconButton = ({ iconName, onClick, ...props }) => {
	const storedIcon = getIcon({ name: iconName })

	return (
		<Button onClick={onClick} color='white' {...props}>
			{storedIcon}
		</Button>
	)
}
