import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Calendar } from '../entities/Calendar'
import { BaseDayCalendar } from '../shared/ui/BaseDayCalendar'
import { groupArraysByDate } from './lib/groupArraysByFields'

type CalendarWeekProps = {
	calendarItem: Calendar
	dateStart: string
}

export const CalendarWeek = (props: CalendarWeekProps) => {
	const { calendarItem } = props
	const daysTasks = groupArraysByDate(calendarItem)
	return (
		<CalendarWrapper>
			{Object.keys(daysTasks).map(key => {
				if (key === '') return
				return (
					<BaseDayCalendar tasks={daysTasks[key].tasks} events={daysTasks[key].events} key={key} date={key} />
				)
			})}
		</CalendarWrapper>
	)
}

const CalendarWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	padding: '1em',
})
