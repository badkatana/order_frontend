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

	const flatFields = [...config].flatMap(item => {
		if ('column' in item) return item.column
		return item
	})

	const defaultValues = flatFields.reduce((acc, field) => {
		acc[field.name] = field.defaultValue ?? ''
		return acc
	}, {} as DefaultObjectString)

	console.log(defaultValues)

	const methods = useForm({
		mode: 'onChange',
		defaultValues: defaultValues || {},
	})

	return (
		<FormProvider {...methods}>
			<Form onSubmit={methods.handleSubmit(submitFunction)}>
				<Stack spacing={3} marginTop={2} display='flex' flexDirection={'column'}>
					{/* Отображение колонок */}
					<Stack direction='row' spacing={3} display={'flex'} alignItems={'center'}>
						{config
							.filter(item => 'column' in item)
							.map((item, index) => (
								<Stack key={`column_${index}`} spacing={2} minWidth={240}>
									{item.column?.map((field, subIndex) => (
										<Box key={`field_${field.name}_${subIndex}`}>
											<field.component control={methods.control} fullWidth {...field} />
										</Box>
									))}
								</Stack>
							))}
					</Stack>

					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 1,
							rowGap: 2,
						}}
					>
						{config
							.filter(item => !('column' in item))
							.map((field, index) => (
								<Box
									key={`single_${field.name}_${index}`}
									sx={{
										flex: '1 1 30%',
										minWidth: 250,
										gap: 1,
										flexDirection: 'column',
									}}
								>
									<field.component fullWidth control={methods.control} {...field} />
								</Box>
							))}
					</Box>
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
