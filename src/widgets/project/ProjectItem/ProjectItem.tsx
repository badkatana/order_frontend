import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { CustomTabsType } from '@/shared/constants/constants'
import { ContainerPlaceholder, CustomTabs, DeadlinesComponent } from '@/shared/ui'
import { ProjectUsersModal } from '@/widgets/modals'
import { Box, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { ProjectItemTasks } from './ProjectItemTasks'

export const ProjectItem = ({ project }: { project?: Project | null; tasks?: Task[] }) => {
	if (!project) return <ContainerPlaceholder placeholder={'Select or create a project'} />

	const { description, projectId, tasks, events, hardDeadline, softDeadline, links } = project || {}
	const [openModal, setOpenModal] = useState(false)

	const projectTabs: CustomTabsType[] = [
		{
			label: 'task.titlePlural',
			content: <ProjectItemTasks projectId={projectId} tasks={tasks} />,
		},
		{
			label: 'events',
			content: <>here 2</>,
		},
	]

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
				></Box>
			</Box>
			<CustomTabs tabs={projectTabs} tabPanelSx={{ minHeight: '50em' }} />
		</ProjectCard>
	)
}

const ProjectCard = styled(Box)({
	display: 'flex',
	height: '100%',
	width: '80%',
	flexDirection: 'column',
})
