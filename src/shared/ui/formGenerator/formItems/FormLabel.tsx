import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const CustomFormLabel = ({ label }) => {
	const { i18n, t } = useTranslation()

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
			{i18n.exists(label) ? t(label) : label}
		</Typography>
	)
}
