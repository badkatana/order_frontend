import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Event } from '../../entities/Event'
import { Task } from '../../entities/Task'
import { getTaskWithDeadlines } from '../../widgets/lib/getTasksWithDeadlines'
import { DateHeader } from './DateHeader'
import { ListWrapper } from './ListWrapper'
import { ListItemTask } from './listItems/ListItemTask'

type BaseDayCalendarProps = {
	tasks: Task[]
	events: Event[]
	date: string
}

export const BaseDayCalendar = (props: BaseDayCalendarProps) => {
	const { tasks, events, date } = props
	// todo: optimaze; when we sort task get it also
	const { hardDeadlinesTasks, softDeadlinesTasks } = getTaskWithDeadlines(tasks, date)

	return (
		<Wrapper>
			<Box px={'1em'}>
				<DateHeader date={date} />
				<DeadlinesArea tasks={hardDeadlinesTasks} color={'#D80032'} />
				<DeadlinesArea tasks={softDeadlinesTasks} color={'#B66F0D'} />
				<ListWrapper>
					{tasks.map(task => (
						<ListItemTask task={task} taskClick={() => console.log(task.id)} />
					))}
				</ListWrapper>
			</Box>
		</Wrapper>
	)
}

const DeadlinesArea = ({ tasks, color }) => {
	if (tasks.lenght < 1) return
	return (
		<Box>
			{tasks &&
				tasks.map((hard: Task) => (
					<Box
						key={hard.id}
						backgroundColor={color}
						borderRadius={'2em'}
						padding={' 0.5em 1em 0.5em 1em '}
						marginBottom={'0.2em'}
					>
						{hard.name}
					</Box>
				))}
		</Box>
	)
}
const Wrapper = styled(Box)({
	width: '18em',
	height: '90%',
	margin: '0.3em',
	border: '0.1em solid #606162',
	borderRadius: '3em',
	paddingTop: '1em',
	display: 'flex',
	background: `linear-gradient(to bottom, 
    #1E1E22, 
    #34343C, 
    #4B4B55, 
    #61616F, 
    #787888)`,
	flexDirection: 'column',
})
