import LanguageIcon from '@mui/icons-material/Language'
import { Card, CardContent, MenuItem, Select, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { t } from 'i18next'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
	const { control } = useFormContext()
	const { i18n } = useTranslation()

	return (
		<Controller
			name='language'
			control={control}
			render={({ field }) => (
				<Card variant='outlined' sx={{ borderRadius: 3, borderColor: 'transparent' }}>
					<CardContent>
						<Stack direction='row' alignItems='center' justifyContent='space-between'>
							<Stack direction='row' alignItems='center' spacing={1}>
								<LanguageIcon color='primary' />
								<Typography variant='subtitle1'>{t('settings.language')}</Typography>
							</Stack>
							<Select
								{...field}
								variant='standard'
								disableUnderline
								sx={{ minWidth: 100, fontWeight: 500 }}
								onChange={value => {
									i18n.changeLanguage(value.target.value || 'ru')
									dayjs.locale(value.target.value || 'ru')
									field.onChange(value)
								}}
							>
								<MenuItem value='ru'>Русский</MenuItem>
								<MenuItem value='en'>English</MenuItem>
							</Select>
						</Stack>
					</CardContent>
				</Card>
			)}
		/>
	)
}
