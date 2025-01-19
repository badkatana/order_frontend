import { FormItem } from '@/entities/interfaces'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Controller } from 'react-hook-form'

dayjs.extend(customParseFormat)

export const InputDateTime = ({ control, name, maxDate, minDate, label, defaultValue }: FormItem) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue && dayjs(defaultValue, 'YYYY-MM-DDTHH:mm')}
			render={({ field: { onChange, value } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						label={label}
						onChange={onChange}
						value={value}
						maxDate={maxDate ?? null}
						minDate={minDate ?? null}
					/>
				</LocalizationProvider>
			)}
		/>
	)
}

//  ;<LocalizationProvider dateAdapter={AdapterDayjs}>
// 		<DemoContainer components={['DateTimePicker']}>
// 			<DateTimePicker label='Basic date time picker' />
// 		</DemoContainer>
//  </LocalizationProvider>
