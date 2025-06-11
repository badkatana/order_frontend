import { DefaultConfig, DefaultObjectString } from '@/shared/constants/constants'
import { Box, Button, styled } from '@mui/material'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type GeneralFormProps = {
	config: DefaultConfig
	submitFunction: (values: any) => void
}

export const GeneralForm = ({ config, submitFunction }: GeneralFormProps) => {
	const { t } = useTranslation()
	const defaultValues = config.reduce((acc, field) => {
		acc[field.name] = field.defaultValue || null
		return acc
	}, {} as DefaultObjectString)

	const { control, handleSubmit } = useForm({ mode: 'onChange' })
	const methods = useForm({ defaultValues })

	return (
		<FormProvider {...methods}>
			{/*  @ts-ignore */}
			<Form control={control} onSubmit={handleSubmit(submitFunction)}>
				{config.map((item, index) => (
					<>
						<item.component key={`form_${item.name}_${index}`} control={control} {...item} />
					</>
				))}
				<Box justifyContent={'flex-end'} display={'flex'} flexDirection={'row'}>
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
