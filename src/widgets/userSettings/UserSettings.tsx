import i18n from '@/app/i18n/i18n'
import { getUserInfo } from '@/shared/api/userRoutes'
import { ModalBody } from '@/shared/ui'
import { CustomQrCode } from '@/shared/ui/CustomQrCode/CustomQrCode'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { Avatar, Box, Divider, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher'
import { ThemeToggle } from './LanguageSwitcher/ThemeToggle'

export const UserSettings = ({ open, handleClose }) => {
	const theme = useTheme()
	console.log('theme', theme.palette.mode)

	const userConfig = [
		{
			name: 'language',
			label: 'language',
			defaultValue: i18n.language,
			component: LanguageSwitcher,
			required: false,
		},
		{
			name: 'theme',
			label: 'theme',
			defaultValue: theme.palette.mode === 'dark' ? true : false,
			component: ThemeToggle,
			required: true,
		},
	]

	const { data: user, isFetching } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	})

	if (isFetching) return

	return (
		<ModalBody open={open} handleClose={handleClose} title={'settings.title'} sx={{ maxWidth: '30em' }}>
			<Box
				sx={{
					textAlign: 'center',
					borderRadius: 4,
				}}
			>
				<Paper
					elevation={6}
					sx={{
						p: 3,
						borderRadius: 4,
						textAlign: 'center',
						backgroundColor: theme.palette.background.paper,
						maxWidth: 360,
						mx: 'auto',
						position: 'relative',
					}}
				>
					<Box sx={{ position: 'absolute', top: 16, right: 16 }}>
						<Tooltip title='Получить QR-код'>
							<CustomQrCode />
						</Tooltip>
					</Box>

					<Avatar
						sx={{
							width: 80,
							height: 80,
							mx: 'auto',
							mb: 2,
							bgcolor: theme.palette.primary.main,
							fontSize: 32,
							boxShadow: 3,
						}}
					>
						{user.name?.[0]?.toUpperCase()}
					</Avatar>

					<Typography variant='h6' fontWeight={600} gutterBottom>
						{user.name}
					</Typography>

					<Typography variant='body2' color='text.secondary' sx={{ wordBreak: 'break-word' }}>
						{user.email}
					</Typography>

					<Divider sx={{ my: 3 }} />
				</Paper>
				<Stack spacing={3} mt={3}>
					<GeneralForm config={userConfig} submitFunction={values => console.log(values)} />
				</Stack>
			</Box>
		</ModalBody>
	)
}
