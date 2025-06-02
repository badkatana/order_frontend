import { loginUser } from '@/shared/api'
import { registerUser } from '@/shared/api/authRoutes'
import { DefaultObjectString } from '@/shared/constants/constants'
import { AuthConfig } from '@/shared/formConfigs'
import { useAuth } from '@/shared/hooks/useAuth'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { FieldValues, Form, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const SessionForm = () => {
	const { control, handleSubmit } = useForm<FieldValues>()
	const navigate = useNavigate()
	const [helperText, setHelperText] = useState<string | null>()
	const { login } = useAuth()

	const validateFields = async (values: DefaultObjectString) => {
		if (!values.type) setHelperText('Are you want to register or login? ')
	}
	const registerOrLoginUser = async (values: DefaultObjectString) => {
		await validateFields(values)
		const type = values.type
		delete values.type
		const { token, userId } = type?.includes('1') ? await registerUser(values) : await loginUser(values)

		console.log(token, userId)
		if (token && userId) {
			localStorage.setItem('user_id', userId)
			sessionStorage.setItem('access_token', token)

			login()

			navigate('/calenders')
		}
	}

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography>{helperText}</Typography>
			{/*  @ts-ignore */}
			<Form control={control} onSubmit={handleSubmit(values => registerOrLoginUser(values))}>
				<Box sx={{ zIndex: 1 }}>
					<Typography variant='h4' gutterBottom>
						order
					</Typography>
					{AuthConfig.map(item => (
						<Box marginBottom={'0.5em'}>
							<item.component key={`${item.name}`} control={control} {...item} />
						</Box>
					))}
					<Button variant='contained' color='primary' type='submit'>
						start session
					</Button>
				</Box>
			</Form>
		</Box>
	)
}
