import { getWeekBoundaries, useAppStore } from '@/app/store/store'
import { Box, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { CustomIconButton } from '../buttons/CustomIconButton'
import { WEEK_DIRECTION } from '../constants/constants'

dayjs.extend(isoWeek)

interface WeekPickerProps {
	onChange?: (startOfWeek: Dayjs, endOfWeek: Dayjs) => void
}

const WeekPicker = ({ onChange }: WeekPickerProps) => {
	const { savedDate, setSavedDate } = useAppStore()

	const handleDateChange = (date: Dayjs | null) => {
		if (date) {
			const { monday, sunday } = getWeekBoundaries(date)
			setSavedDate(date)
			onChange?.(monday, sunday)
		}
	}

	const handleSelectWeek = (direction: WEEK_DIRECTION) => {
		const updatedDate = direction === 'previous' ? savedDate.subtract(1, 'week') : savedDate.add(1, 'week')
		handleDateChange(updatedDate)
	}

	const formatWeekLabel = (date: Dayjs | null | undefined) => {
		if (!date) return '(none)'
		const startOfWeek = dayjs(date).startOf('week')
		const endOfWeek = dayjs(date).endOf('week')
		return `${startOfWeek.format('DD MMM')} - ${endOfWeek.format('DD MMM YYYY')}`
	}

	const WeekSwitcher = ({ direction, iconName }: { direction: WEEK_DIRECTION; iconName: string }) => {
		return (
			<CustomIconButton
				iconName={iconName}
				text={null}
				onClick={() => handleSelectWeek(direction)}
				sx={{ minWidth: 0, p: 1 }}
			/>
		)
	}

	return (
		<Box sx={{ maxWidth: '20%', display: 'flex', flexDirection: 'row' }}>
			<WeekSwitcher direction={'previous'} iconName={'leftArrow'} />
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					value={savedDate}
					onChange={handleDateChange}
					displayWeekNumber
					slots={{
						textField: params => (
							<TextField
								{...params}
								value={formatWeekLabel(savedDate)}
								variant='outlined'
								size='small'
								sx={{
									input: {
										textAlign: 'center',
										cursor: 'default',
									},
									...MUI_FocusedStyles,
								}}
							/>
						),
					}}
				/>
			</LocalizationProvider>
			<WeekSwitcher direction={'next'} iconName={'rightArrow'} />
		</Box>
	)
}

export default WeekPicker

const MUI_FocusedStyles = {
	'& .MuiOutlinedInput-root': {
		'&:hover fieldset': {
			borderColor: 'gray',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'gray',
			boxShadow: 'none',
		},
	},
	'& .MuiInputBase-root.Mui-focused': {
		backgroundColor: 'transparent',
	},
}
