import { Box, Button, Grid, styled } from '@mui/material'
import { ReactNode } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'

type GeneralFormProps = {
	config: {
		name: string
		component: ReactNode
		label: string
		maxDate?: any
		minDate?: any
		required?: any
		defaultValue?: unknown
		multiLine?: boolean
	}[]
	submitFunction: (values: { [key: string]: undefined | null | string | number | unknown }) => void
}

export const GeneralForm = ({ config, submitFunction }: GeneralFormProps) => {
	const { control, handleSubmit } = useForm({ mode: 'onChange' })
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			<Form control={control} onSubmit={handleSubmit(submitFunction)}>
				<Grid container spacing={2}>
					{config.map((item, index) => (
						<Grid item xs={4} key={index}>
							<item.component key={`form_${item.name}_${index}`} control={control} {...item} />
						</Grid>
					))}
				</Grid>
				<Box marginLeft={'auto'} display={'flex'} alignItems={'flex-start'} flexDirection={'row'}>
					<ButtonStyled type='submit'>Here</ButtonStyled>
				</Box>
			</Form>
		</FormProvider>
	)
}

const ButtonStyled = styled(Button)({
	marginTop: '1em',
	backgroundColor: '#187018',
	color: 'white',
})
