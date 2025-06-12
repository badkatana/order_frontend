import i18n from '@/app/i18n/i18n'
import { FormItem } from '@/entities/interfaces'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Controller } from 'react-hook-form'
import { CustomFormLabel } from './FormLabel'

dayjs.extend(customParseFormat)

export const InputDateTime = ({ control, name, maxDate, minDate, label }: FormItem) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => {
				return (
					<>
						<CustomFormLabel label={label} />
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								onChange={onChange}
								value={typeof value === 'string' ? dayjs(value) : value}
								maxDate={maxDate ?? null}
								minDate={minDate ?? null}
								ampm={i18n.language === 'ru' ? false : true}
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
										variant: 'filled',
										placeholder: '',
										hiddenLabel: true,
									},
								}}
							/>
						</LocalizationProvider>
					</>
				)
			}}
		/>
	)
}
