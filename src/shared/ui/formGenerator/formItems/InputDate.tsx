import { FormItem } from '@/entities/interfaces'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'

export const InputDate = ({ control, name, label, defaultValue, minDate, maxDate }: FormItem) => {
	return (
		<Controller
			defaultValue={defaultValue && dayjs(defaultValue)}
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label={label}
						format={'YYYY-MM-DD'}
						value={value}
						minDate={minDate}
						maxDate={maxDate ? dayjs(maxDate) : null}
						onChange={onChange}
						// slotProps={{
						// 	textField: {
						// 		helperText: 'Enter date'
						// 	},
						// }}
					/>
				</LocalizationProvider>
			)}
		/>
	)
}
