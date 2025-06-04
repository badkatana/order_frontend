import { Event } from '@/entities/Event'
import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { ContainerPlaceholder, DeadlinesComponent } from '@/shared/ui'
import { ListItemEvent } from '@/shared/ui/listItems/ListItemEvent'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { submitEvent, submitTask } from '@/widgets/lib/submitForm'
import { ProjectUsersModal } from '@/widgets/modals'
import { Box, styled, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { EntityArea } from './EntityArea'

export const ProjectItem = ({ project }: { project?: Project | null; tasks?: Task[] }) => {
	if (!project) return <ContainerPlaceholder placeholder={'Select or create a project'} />
	const { description, id, tasks, events, hardDeadline, softDeadline, links } = project
	const queryClient = useQueryClient()
	const [openModal, setOpenModal] = useState(false)

	const submitProjectTask = async (task: Task) => {
		submitTask({ ...task, projectId: id })
		/// @ts-ignore
		queryClient.invalidateQueries(['projects'])
	}

	const submitProjectEvent = async (event: Event) => {
		/// @ts-ignore
		submitEvent({ ...event, projectId: id })
		queryClient.invalidateQueries({ queryKey: ['projects'] })
	}

	return (
		<ProjectCard>
			<ProjectUsersModal open={openModal} handleClose={() => setOpenModal(false)} />
			<Box>
				<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
					<Box>
						<Typography variant='h4'>{description}</Typography>
						<Box display={'flex'} flexDirection={'row'} gap={1}>
							<DeadlinesComponent variant='soft' date={softDeadline} />
							<DeadlinesComponent variant='hard' date={hardDeadline} />
						</Box>
					</Box>

					<CustomIconButton iconName={'manageUser'} onClick={() => setOpenModal(true)} />
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
							tasks?.map((task: Task | any, index: any) => (
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
							events?.map((event: any, index: any) => (
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
