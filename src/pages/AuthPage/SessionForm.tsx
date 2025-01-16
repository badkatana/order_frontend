import { loginUser } from '@/shared/api'
import { registerUser } from '@/shared/api/authRoutes'
import { DefaultObjectString } from '@/shared/constants/constants'
import { AuthConfig } from '@/shared/formConfigs'
import { useAuth } from '@/shared/hooks/useAuth'
import { Box, Button, Typography } from '@mui/material'
import { FieldValues, Form, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const SessionForm = () => {
	const { control, handleSubmit } = useForm<FieldValues>()
	const navigate = useNavigate()
	const { login } = useAuth()

	const registerOrLoginUser = async (values: DefaultObjectString) => {
		const type = values.type
		delete values.type
		const { token, userId } = type?.includes('1') ? await registerUser(values) : await loginUser(values)

		if (token && userId) {
			localStorage.setItem('user_id', userId)
			sessionStorage.setItem('access_token', token)

			login()

			navigate('/calenders')
		}
	}

	return (
		// @ts-ignore
		<Form control={control} onSubmit={handleSubmit(values => registerOrLoginUser(values))}>
			<Box sx={{ padding: 4, zIndex: 1 }}>
				<Typography variant='h4' gutterBottom>
					Join Us
				</Typography>
				{AuthConfig.map(item => (
					<item.component key={`${item.name}`} control={control} {...item} />
				))}
				<Button variant='contained' color='primary' type='submit'>
					start session
				</Button>
			</Box>
		</Form>
	)
}
