import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { EventForm, TaskForm } from '@/shared/formConfigs'
import { ContainerPlaceholder } from '@/shared/ui'
import { ListItemEvent } from '@/shared/ui/listItems/ListItemEvent'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { submitTask } from '@/widgets/lib/submitForm'
import { Box, styled, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useQueryClient } from '@tanstack/react-query'
import { EntityArea } from './EntityArea'

export const ProjectItem = ({ project }: { project?: Project; tasks?: Task[] }) => {
	const { description, hardDeadline, priority, taskIds, id, tasks, events } = project || {}

	if (project === null) return <ContainerPlaceholder placeholder={'Select or create a project'} />
	const queryClient = useQueryClient()

	const submitProjectTask = async task => {
		submitTask({ ...task, projectId: id })
		queryClient.invalidateQueries(['projects'])
	}

	return (
		<ProjectCard>
			<Box>
				<Typography variant='h4'>{description}</Typography>
				<Box>Tasks: {taskIds?.length}</Box>
				<LinearProgress value={23} variant='determinate' />
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
							tasks.$values.map(task => <ListItemTask task={task} />)
						) : (
							<ContainerPlaceholder placeholder={'No tasks'} />
						)}
					</EntityArea>
					<EntityArea
						key={'area_events'}
						title={'Events'}
						modalConfig={{
							config: EventForm,
							submitFunction: submitTask,
						}}
					>
						{events?.$values?.length > 0 ? (
							events.$values.map(event => <ListItemEvent event={event} />)
						) : (
							<ContainerPlaceholder placeholder={'No events'} />
						)}
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
