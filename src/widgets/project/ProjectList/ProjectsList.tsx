import { Project } from '@/entities/Project'
import { AddCircleButton, ContainerPlaceholder } from '@/shared/ui'
import { ListItemActions } from '@/shared/ui/listItems/ListItemAction'
import { groupProjectsByPriority } from '@/widgets/lib'
import { deleteProjectById } from '@/widgets/lib/submitForm/submitFunctions'
import { ProjectModalWindow } from '@/widgets/modals'
import { Box, Divider, List, ListItem, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { t } from 'i18next'
import { ReactElement, useState } from 'react'

export const ProjectsList = ({
	projects,
	selectedProject,
	set,
}: {
	projects: Project[]
	selectedProject: Project | null
	set: (project: Project | null) => void
}) => {
	const [open, setOpen] = useState(false)
	const { high, middle, low } = groupProjectsByPriority(projects)
	const [editingProject, setEditingProject] = useState<Project | null>(null)
	const queryClient = useQueryClient()

	const PriorityList = ({ projects, priority }: { projects: Project[]; priority: string }): ReactElement => {
		return (
			<>
				<Typography color='#dc651e' fontStyle={'italic'}>{`${priority} priority`}</Typography>
				{projects?.map((project, index) => (
					<ListItem
						key={`project_${priority}_${index}`}
						onClick={() => set(project)}
						sx={{
							cursor: 'pointer',
							borderRadius: '0.3em',
							backgroundColor: selectedProject === project ? '#989488' : null,
							'&:hover .actions': {
								opacity: 1,
							},
						}}
					>
						<Box display='flex' justifyContent='space-between' alignItems='center' width='90%'>
							<Typography fontSize={14}>{project.description}</Typography>

							<Box
								className='actions'
								sx={{
									opacity: 0,
									display: 'flex',
									alignItems: 'center',
									gap: 1,
									transition: 'opacity 0.3s',
									'& svg': {
										fontSize: 18,
									},
									'& .MuiButton-root': {
										minWidth: 'unset',
										width: 28,
										height: 28,
										padding: '4px',
										lineHeight: 1,
									},
								}}
							>
								<ListItemActions
									deleteAction={() => deleteProjectById(project.projectId, queryClient)}
									editAction={() => {
										setEditingProject(project)
										setOpen(true)
									}}
								/>
							</Box>
						</Box>
					</ListItem>
				))}

				<Divider orientation='horizontal' variant='middle' flexItem sx={{ margin: '1em' }} />
			</>
		)
	}

	return (
		<List sx={{ width: '15%', minWidth: '6em', height: 'inherit', alignSelf: 'stretch' }}>
			{projects === undefined ? (
				<ContainerPlaceholder placeholder={t('project.createProject')} fullHeight={false} />
			) : (
				<>
					{high.length !== 0 && <PriorityList projects={high} priority='High' />}
					{middle.length !== 0 && <PriorityList projects={middle} priority='Medium' />}
					{low.length !== 0 && <PriorityList projects={low} priority='Low' />}
				</>
			)}

			<AddCircleButton onClick={() => setOpen(true)} iconSize='medium' />
			<ProjectModalWindow
				open={open}
				editingProject={editingProject}
				handleClose={() => {
					setOpen(false)
					if (editingProject != null) setEditingProject(null)
				}}
			/>
		</List>
	)
}
