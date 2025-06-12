import { DefaultConfig, DefaultObjectString } from '@/shared/constants/constants'
import { Box, Button, Stack, styled } from '@mui/material'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type GeneralFormProps = {
	config: DefaultConfig
	submitFunction: (values: any) => void
}

export const GeneralForm = ({ config, submitFunction }: GeneralFormProps) => {
	const { t } = useTranslation()

	const defaultValues = config.reduce((acc, field) => {
		acc[field.name] = field.defaultValue ?? null
		return acc
	}, {} as DefaultObjectString)

	const methods = useForm({
		mode: 'onChange',
		defaultValues,
	})

	return (
		<FormProvider {...methods}>
			<Form onSubmit={methods.handleSubmit(submitFunction)}>
				<Stack spacing={3}>
					{config.map((item, index) => (
						<Box key={`form_${item.name}_${index}`}>
							<item.component control={methods.control} {...item} />
						</Box>
					))}
				</Stack>

				<Box display='flex' justifyContent='flex-end' mt={4}>
					<ButtonStyled type='submit'>{t('actions.save')}</ButtonStyled>
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
