import { Event } from '@/entities/Event'
import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { ContainerPlaceholder } from '@/shared/ui'
import { ListItemEvent } from '@/shared/ui/listItems/ListItemEvent'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { submitEvent, submitTask } from '@/widgets/lib/submitForm'
import { Box, styled, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { EntityArea } from './EntityArea'

export const ProjectItem = ({ project }: { project?: Project | null; tasks?: Task[] }) => {
	/// @ts-ignore
	if (!project) return <ContainerPlaceholder placeholder={'Select or create a project'} />
	const { description, id, tasks, events } = project
	const queryClient = useQueryClient()

	const submitProjectTask = async (task: Task) => {
		submitTask({ ...task, projectId: id })
		/// @ts-ignore
		queryClient.invalidateQueries(['projects'])
	}

	const submitProjectEvent = async (event: Event) => {
		/// @ts-ignore
		submitEvent({ ...event, projectId: id })
		/// @ts-ignore
		queryClient.invalidateQueries(['projects'])
	}

	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const completedTasks = tasks?.$values?.filter(task => task.status).length ?? 0
		const totalTasks = tasks?.$values?.length ?? 0
		setProgress((completedTasks / totalTasks) * 100 || 0)
	}, [tasks])

	return (
		<ProjectCard>
			<Box>
				<Typography variant='h4'>{description}</Typography>
				<Box sx={{ paddingTop: '1em' }}>
					Tasks: {progress} %
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
							type: 'Task',
							submitFunction: submitProjectTask,
						}}
					>
						{tasks ? (
							tasks.$values?.map((task: Task | any, index: any) => (
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
							type: 'Event',
							submitFunction: submitProjectEvent,
						}}
					>
						{events ? (
							events.$values?.map((event: any, index: any) => (
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
