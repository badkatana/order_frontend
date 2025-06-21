import { Button, Typography, useTheme } from '@mui/material'
import { getIcon } from '../icons/icons'
import { getTranslatedText } from '../lib'

// @ts-ignore
export const CustomIconButton = ({ iconName, onClick, title = '', ...props }) => {
	const storedIcon = getIcon({ name: iconName })
	const { sx, ...restProps } = props
	const theme = useTheme()
	const translatedTitle = getTranslatedText(title)

	return (
		// @ts-ignore
		<Button
			onClick={onClick}
			color={theme.palette.text.primary}
			sx={{
				'& svg': {
					fontSize: 18,
					color: theme.palette.text.primary,
				},
				color: theme.palette.text.primary,
			}}
		>
			{storedIcon}
			<Typography marginLeft={0.5}>{translatedTitle}</Typography>
		</Button>
	)
}
