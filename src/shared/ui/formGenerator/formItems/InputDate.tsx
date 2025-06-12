import { FormItem } from '@/entities/interfaces'
import { DATE_FORMAT } from '@/shared/constants/constants'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'
import { CustomFormLabel } from './FormLabel'

export const InputDate = ({ control, name, label, defaultValue, minDate, maxDate }: FormItem) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue ? dayjs(defaultValue).format(DATE_FORMAT) : ''}
			render={({ field: { onChange, value } }) => {
				return (
					<>
						<CustomFormLabel label={label} />
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								format={DATE_FORMAT}
								value={value ? dayjs(value) : null}
								minDate={minDate ? dayjs(minDate) : undefined}
								maxDate={maxDate ? dayjs(maxDate) : undefined}
								onChange={date => {
									const formattedDate = date?.format(DATE_FORMAT)
									onChange(formattedDate)
								}}
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
