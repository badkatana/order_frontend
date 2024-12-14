import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller } from 'react-hook-form'

export const InputDateTime = ({ control, name, maxDate, minDate, defaultValue }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						label={'sdfds'}
						onChange={onChange}
						format={'YYYY-MM-DDTHH:MM'}
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
