import { getTranslatedText } from '@/shared/lib'
import { Typography } from '@mui/material'

export const CustomFormLabel = ({
	label,
	required = false,
}: {
	label: string | null | undefined
	required?: boolean
}) => {
	return (
		<Typography
			variant='body2'
			sx={{
				mb: 0.5,
				fontWeight: 500,
				fontSize: '0.85rem',
				color: 'text.secondary',
			}}
		>
			{`${getTranslatedText(label)}${required ? ' *' : ''}`}
		</Typography>
	)
}
