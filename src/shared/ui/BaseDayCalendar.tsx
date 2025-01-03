import { Event } from '@/entities/Event'
import { Task } from '@/entities/Task'
import { TaskModalWindow } from '@/widgets/TaskModalWindow'
import { getTaskWithDeadlines } from '@/widgets/lib/getTasksWithDeadlines'
import styled from '@emotion/styled'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Box, IconButton } from '@mui/material'
import { useState } from 'react'
import { changeTask } from '../api/taskRoutes'
import { DateHeader } from './DateHeader'
import { ListWrapper } from './ListWrapper'
import { ListItemEvent } from './listItems/ListItemEvent'
import { ListItemTask } from './listItems/ListItemTask'

type BaseDayCalendarProps = {
	tasks: Task[]
	events: Event[]
	date: string
}

export const BaseDayCalendar = (props: BaseDayCalendarProps) => {
	const { tasks, events, date } = props
	const [open, setOpen] = useState(false)
	// todo: optimaze; when we sort task get it also
	const { hardDeadlinesTasks, softDeadlinesTasks } = getTaskWithDeadlines(tasks, date)

	return (
		<Wrapper>
			<Box px={'1em'}>
				<DateHeader date={date} />
				<DeadlinesArea tasks={hardDeadlinesTasks} color={'#D80032'} />
				<DeadlinesArea tasks={softDeadlinesTasks} color={'#B66F0D'} />
				<ListWrapper>{events && events.map(event => <ListItemEvent event={event} />)}</ListWrapper>
				<ListWrapper>
					{tasks.map(task => (
						<ListItemTask task={task} taskClick={() => changeTask(task)} />
					))}
				</ListWrapper>
				<Box display={'flex'} justifyContent={'center'}>
					<IconButton color={'inherit'} onClick={() => setOpen(true)}>
						<AddCircleOutlineOutlinedIcon fontSize={'large'} />
					</IconButton>
				</Box>
				<Box>
					<TaskModalWindow open={open} handleClose={() => setOpen(false)} />
				</Box>
			</Box>
		</Wrapper>
	)
}

const DeadlinesArea = ({ tasks, color }) => {
	if (tasks.lenght < 1) return
	return (
		<Box>
			{tasks &&
				tasks.map((hard: Task, index) => (
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
	width: '30vh',
	height: '70vh',
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
