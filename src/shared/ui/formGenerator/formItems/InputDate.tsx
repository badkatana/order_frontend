import { FormItem } from '@/entities/interfaces'
import { DATE_FORMAT } from '@/shared/constants/constants'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'

export const InputDate = ({ control, name, label, defaultValue, minDate, maxDate }: FormItem) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue ? dayjs(defaultValue, DATE_FORMAT) : null}
			render={({ field: { onChange, value } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label={label}
						format={DATE_FORMAT}
						value={value ? dayjs(value) : null}
						minDate={minDate ? dayjs(minDate) : undefined}
						maxDate={maxDate ? dayjs(maxDate) : undefined}
						onChange={date => {
							const formattedDate = date?.format(DATE_FORMAT)
							onChange(formattedDate)
						}}

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
