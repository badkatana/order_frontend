import { Box, Button, Typography } from '@mui/material'
import { Form, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthConfig } from '../../shared/formConfigs/AuthConfig'
import { registerOrLoginUser } from '../lib/authPage'

export const SessionForm = () => {
	const { control, handleSubmit } = useForm()
	const navigate = useNavigate()

	return (
		<Form control={control} onSubmit={handleSubmit(values => registerOrLoginUser(values, navigate))}>
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
