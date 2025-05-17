import { Button } from '@mui/material'
import { getIcon } from '../icons/icons'

// @ts-ignore
export const CustomIconButton = ({ iconName, onClick, ...props }) => {
	const storedIcon = getIcon({ name: iconName })

	return (
		// @ts-ignore
		<Button onClick={onClick} color='white' {...props}>
			{storedIcon}
		</Button>
	)
}
