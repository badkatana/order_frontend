import { loginUser } from '@/shared/api'
import { registerUser } from '@/shared/api/authRoutes'
import { AuthConfig } from '@/shared/formConfigs'
import { Box, Button, Typography } from '@mui/material'
import { Form, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const SessionForm = () => {
	const { control, handleSubmit } = useForm()
	const navigate = useNavigate()

	const registerOrLoginUser = async values => {
		const type = values.type
		delete values.type
		const { token, userId } = type.includes('1') ? await registerUser(values) : await loginUser(values)

		if (token && userId) {
			localStorage.setItem('user_id', userId)
			sessionStorage.setItem('access_token', token)
			navigate('/calenders')
		}
	}

	return (
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
