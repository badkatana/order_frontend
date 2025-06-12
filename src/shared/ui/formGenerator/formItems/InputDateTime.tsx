import { FormItem } from '@/entities/interfaces'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Controller } from 'react-hook-form'

dayjs.extend(customParseFormat)

export const InputDateTime = ({ control, name, maxDate, minDate, label }: FormItem) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => {
				return (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							label={label}
							onChange={onChange}
							value={typeof value === 'string' ? dayjs(value) : value}
							maxDate={maxDate ?? null}
							minDate={minDate ?? null}
						/>
					</LocalizationProvider>
				)
			}}
		/>
	)
}
