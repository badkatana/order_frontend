import { DefaultConfig } from '@/shared/constants/constants'
import { Box, Button, Grid, styled } from '@mui/material'
import { Form, FormProvider, useForm } from 'react-hook-form'

type GeneralFormProps = {
	config: DefaultConfig
	submitFunction: (values: any) => void
}

export const GeneralForm = ({ config, submitFunction }: GeneralFormProps) => {
	const { control, handleSubmit } = useForm({ mode: 'onChange' })
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			{/*  @ts-ignore */}
			<Form control={control} onSubmit={handleSubmit(submitFunction)}>
				<Grid container spacing={2}>
					{config.map((item, index) => (
						<Grid item xs={4} key={index}>
							{/*  @ts-ignore */}
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
