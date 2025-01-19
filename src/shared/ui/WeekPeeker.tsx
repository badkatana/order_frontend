import { getWeekBoundaries, useAppStore } from '@/app/store/store'
import { TextField, TextFieldProps } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import React from 'react'

dayjs.extend(isoWeek)

interface WeekPickerProps {
	onChange?: (startOfWeek: Dayjs, endOfWeek: Dayjs) => void
}

const WeekPicker: React.FC<WeekPickerProps> = ({ onChange }) => {
	const { savedDate, setSavedDate } = useAppStore()

	const handleDateChange = (date: Dayjs | null) => {
		if (date) {
			const { monday, sunday } = getWeekBoundaries(date)
			setSavedDate(date)
			onChange?.(monday, sunday)
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				label='Select Week'
				value={savedDate}
				onChange={handleDateChange}
				slots={{ textField: CustomTextField }}
			/>
		</LocalizationProvider>
	)
}

export default WeekPicker

const formatWeekLabel = (date: Dayjs | null): string => {
	if (!date) return ''
	const startOfWeek = date.startOf('isoWeek')
	const endOfWeek = date.endOf('isoWeek')
	return `${startOfWeek.format('DD.MM')} - ${endOfWeek.format('DD.MM')}`
}

function CustomTextField(params: TextFieldProps) {
	return <TextField value={formatWeekLabel(dayjs())} size='small' {...params} />
}
