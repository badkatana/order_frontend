import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'

export const InputDate = ({ control, name = '', label = '' }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label={label}
						format={'DD.MM.YYYY'}
						minDate={dayjs()}
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
