import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { EventForm, TaskForm } from '@/shared/formConfigs'
import { ContainerPlaceholder } from '@/shared/ui'
import { ListItemEvent } from '@/shared/ui/listItems/ListItemEvent'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { submitEvent, submitTask } from '@/widgets/lib/submitForm'
import { Box, styled, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { EntityArea } from './EntityArea'

export const ProjectItem = ({ project }: { project?: Project; tasks?: Task[] }) => {
	const { description, hardDeadline, priority, taskIds, id, tasks, events, tasksIds } = project || {}
	const queryClient = useQueryClient()

	if (project === null) return <ContainerPlaceholder placeholder={'Select or create a project'} />

	const submitProjectTask = async task => {
		submitTask({ ...task, projectId: id })
		queryClient.invalidateQueries(['projects'])
	}

	const submitProjectEvent = async event => {
		submitEvent({ ...event, projectId: id })
		queryClient.invalidateQueries(['projects'])
	}

	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (tasks && tasks.$values.length > 0) {
			const completedTasks = tasks.$values.filter(task => task.status).length
			const totalTasks = tasks.$values.length
			setProgress((completedTasks / totalTasks) * 100)
		} else {
			setProgress(0)
		}
	}, [tasks])

	return (
		<ProjectCard>
			<Box>
				<Typography variant='h4'>{description}</Typography>
				<Box sx={{ paddingTop: '1em' }}>
					Tasks: {taskIds?.length}
					<LinearProgress
						value={progress}
						variant='determinate'
						color='inherit'
						sx={{ marginTop: '0.5em' }}
					/>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						gap: '1em',
						width: '100%',
						paddingTop: '1em',
					}}
				>
					<EntityArea
						key={'area_tasks'}
						title={'Tasks'}
						modalConfig={{
							config: TaskForm,
							submitFunction: submitProjectTask,
						}}
					>
						{tasks?.$values?.length > 0 ? (
							tasks.$values.map((task, index) => (
								<ListItemTask key={`task_project_${index}`} task={task} />
							))
						) : (
							<ContainerPlaceholder placeholder={'No tasks'} />
						)}
					</EntityArea>
					<EntityArea
						key={'area_events'}
						title={'Events'}
						modalConfig={{
							config: EventForm,
							submitFunction: submitProjectEvent,
						}}
					>
						{events?.$values?.length > 0 ? (
							events.$values.map((event, index) => (
								<ListItemEvent key={`event_project_${index}`} event={event} />
							))
						) : (
							<ContainerPlaceholder placeholder={'No events'} />
						)}
					</EntityArea>
					<EntityArea key={'area-events'} title={'Links'}>
						<div>Links</div>
					</EntityArea>
				</Box>
			</Box>
		</ProjectCard>
	)
}

const ProjectCard = styled(Box)({
	display: 'flex',
	height: '100%',
	width: '80%',
	flexDirection: 'column',
})
