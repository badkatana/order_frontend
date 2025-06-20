import { useAppStore } from '@/app'
import { Note } from '@/entities/Note'
import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { CustomTabsType } from '@/shared/constants/constants'
import { ContainerPlaceholder, CustomTabs, DeadlinesComponent } from '@/shared/ui'
import { ProjectUsersModal } from '@/widgets/modals'
import { Box, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { ProjectItemLinks } from './ProjectItemLinks'
import { ProjectItemNotes } from './ProjectItemNotes'
import { ProjectItemTasks } from './ProjectItemTasks'

export const ProjectItem = ({}: { project?: Project | null; tasks?: Task[]; notes?: Note[] }) => {
	const { selectedProject: project } = useAppStore()
	const { description, projectId, tasks, hardDeadline, softDeadline, notes, links } = (project as Project) || {}
	const [openModal, setOpenModal] = useState(false)

	const projectTabs: CustomTabsType[] = [
		{
			label: 'task.titlePlural',
			content: <ProjectItemTasks projectId={projectId} tasks={tasks || []} />,
		},
		{
			label: 'note.titlePlural',
			content: <ProjectItemNotes notes={notes} />,
		},
		{
			label: 'project.links',
			content: <ProjectItemLinks links={links} />,
		},
	]

	if (!project) return <ContainerPlaceholder />

	return (
		<ProjectCard>
			<ProjectUsersModal open={openModal} handleClose={() => setOpenModal(false)} />
			<Box>
				<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
					<Box>
						<Typography variant='h4'>{description}</Typography>
						<Box display={'flex'} flexDirection={'row'} gap={1} mt={1}>
							<DeadlinesComponent variant='soft' date={softDeadline} />
							<DeadlinesComponent variant='hard' date={hardDeadline} />
						</Box>
					</Box>

					<CustomIconButton iconName={'manageUser'} onClick={() => setOpenModal(true)} />
				</Box>
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
