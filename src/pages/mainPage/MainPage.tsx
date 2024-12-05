import { Task } from '../../entities/Task'
import { CalendarWeek } from '../../widgets/CalendarWeek'
import { WorkingArea } from '../../widgets/WorkingArea'

const tasks: Task[] = [
	{
		id: 1,
		name: 'Прогуляться',
		description: 'Прогуляться по району, где раньше не гулял',
		userId: 'admin',
		status: false,
		// calendarDate: '12.02.2024',
		hardDeadline: '12.02.2024',
	},
	{
		id: 2,
		name: 'Дать коту шебы',
		userId: 'admin',
		status: false,
		softDeadline: '12.02.2024',
	},
	{
		id: 3,
		name: 'Захватить мир',
		userId: 'admin',
		status: false,
		calendarDate: '12.03.2024',
	},
]

const events = [
	{
		id: 1,
		name: 'here 1',
		type: 'lecture',
		calendarDate: '12.03.2024 11:50',
		isPrivate: false,
	},
]

const calendarItem = {
	tasks: tasks,
	events: events,
	context: [],
	userId: '',
}

export const MainPage = () => {
	return (
		<WorkingArea>
			<CalendarWeek calendarItem={calendarItem} dateStart='here' />
		</WorkingArea>
	)
}
