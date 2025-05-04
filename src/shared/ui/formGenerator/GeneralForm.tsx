import { DefaultConfig } from '@/shared/constants/constants'
import { Box, Button, styled } from '@mui/material'
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
				{config.map((item, index) => (
					<>
						<item.component key={`form_${item.name}_${index}`} control={control} {...item} />
					</>
				))}
				<Box marginLeft={'auto'} display={'flex'} alignItems={'center'} flexDirection={'row'}>
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
