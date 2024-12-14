import { Button, Grid, Typography } from '@mui/material'
import { addDays, endOfWeek, format, startOfWeek } from 'date-fns'
import { useState } from 'react'

const WeekPicker = () => {
	const [selectedWeek, setSelectedWeek] = useState({ start: null, end: null })

	const handleDateClick = date => {
		const start = startOfWeek(date, { weekStartsOn: 1 }) // Понедельник
		const end = endOfWeek(date, { weekStartsOn: 1 }) // Воскресенье
		setSelectedWeek({ start, end })
	}

	const renderDays = () => {
		const days = []
		for (let i = 0; i < 7; i++) {
			const date = addDays(new Date(), i) // Текущая дата + i дней
			days.push(
				<Grid item xs={1} key={i}>
					<Button
						variant='outlined'
						onClick={() => handleDateClick(date)}
						style={{
							backgroundColor:
								selectedWeek.start &&
								selectedWeek.end &&
								date >= selectedWeek.start &&
								date <= selectedWeek.end
									? '#3f51b5'
									: 'transparent',
							color:
								selectedWeek.start &&
								selectedWeek.end &&
								date >= selectedWeek.start &&
								date <= selectedWeek.end
									? '#fff'
									: '#000',
							width: '100%',
						}}
					>
						{format(date, 'EEEE')}
					</Button>
				</Grid>
			)
		}
		return days
	}

	return (
		<div>
			<Typography variant='h6'>Выберите неделю:</Typography>
			<Grid container spacing={2}>
				{renderDays()}
			</Grid>
			{selectedWeek.start && selectedWeek.end && (
				<Typography variant='body1'>
					Выбрана неделя: {format(selectedWeek.start, 'YYYY-MM-DD')} -{' '}
					{format(selectedWeek.end, 'YYYY-MM-DD')}
				</Typography>
			)}
		</div>
	)
}

export default WeekPicker
