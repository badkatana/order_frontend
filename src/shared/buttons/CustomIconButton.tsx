import { Button, Typography } from '@mui/material'
import { getIcon } from '../icons/icons'
import { getTranslatedText } from '../lib'

// @ts-ignore
export const CustomIconButton = ({ iconName, onClick, title = '', ...props }) => {
	const storedIcon = getIcon({ name: iconName })
	const { sx, ...restProps } = props
	const translatedTitle = getTranslatedText(title)

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
			<Typography marginLeft={0.5}>{translatedTitle}</Typography>
		</Button>
	)
}
