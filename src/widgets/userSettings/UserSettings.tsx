import i18n from '@/app/i18n/i18n'
import { getUserInfo } from '@/shared/api/userRoutes'
import { DefaultConfig } from '@/shared/constants/constants'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { Avatar, Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher'
import { ThemeToggle } from './LanguageSwitcher/ThemeToggle'

export const UserSettings = ({ open, handleClose }) => {
	const userConfig: DefaultConfig[] = [
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
			defaultValue: 'dark',
			component: ThemeToggle,
			required: true,
		},
	]

	const { data: user, isFetching } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	})
	const theme = useTheme()

	if (isFetching) return

	return (
		<ModalBody open={open} handleClose={handleClose} title={'settings.appearance'} sx={{ maxWidth: '30em' }}>
			<Box
				sx={{
					textAlign: 'center',
					borderRadius: 4,
				}}
			>
				<Paper
					elevation={4}
					sx={{
						p: 3,
						borderRadius: 4,
						textAlign: 'center',
						backgroundColor: theme.palette.background.paper,
						maxWidth: 320,
						mx: 'auto',
					}}
				>
					<Avatar
						sx={{
							width: 80,
							height: 80,
							mx: 'auto',
							mb: 2,
							bgcolor: theme.palette.primary.main,
							fontSize: 32,
						}}
					>
						{user.name[0]}
					</Avatar>

					<Typography variant='h6' fontWeight={600} gutterBottom>
						{user.name}
					</Typography>

					<Typography variant='body2' color='text.secondary' sx={{ wordBreak: 'break-word' }}>
						{user.email}
					</Typography>
				</Paper>
				<Stack spacing={3} mt={3}>
					<GeneralForm config={userConfig} submitFunction={values => console.log(values)} />
				</Stack>
			</Box>
		</ModalBody>
	)
}
