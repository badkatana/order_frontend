import { useAppTheme } from '@/shared/context/ThemeContext'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Card, CardContent, Stack, Switch, Typography } from '@mui/material'
import { t } from 'i18next'
import { Controller, useFormContext } from 'react-hook-form'

export const ThemeToggle = () => {
	const { control } = useFormContext()
	const { setMode } = useAppTheme()

	return (
		<Controller
			name='theme'
			control={control}
			render={({ field }) => (
				<Card variant='outlined' sx={{ borderRadius: 3, borderColor: 'transparent' }}>
					<CardContent>
						<Stack direction='row' alignItems='center' justifyContent='space-between'>
							<Stack direction='row' alignItems='center' spacing={1}>
								<DarkModeIcon color={field.value ? 'primary' : 'disabled'} />
								<Typography variant='subtitle1'>{t('settings.darkTheme')}</Typography>
							</Stack>
							<Switch
								{...field}
								checked={field.value}
								onChange={e => {
									const value = !field.value ? 'dark' : 'light'
									console.log(value)
									setMode(value)
									field.onChange(e)
								}}
							/>
						</Stack>
					</CardContent>
				</Card>
			)}
		/>
	)
}
