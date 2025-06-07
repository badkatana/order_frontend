import { Project } from '@/entities/Project'
import { useSearchPriorityEntity } from '@/features'
import { AddCircleButton, ContainerPlaceholder } from '@/shared/ui'
import { ListWithActions } from '@/shared/ui/listItems/ListWithActions'
import { groupByPriority } from '@/widgets/lib'
import { deleteProjectById } from '@/widgets/lib/submitForm/submitFunctions'
import { ProjectModalWindow } from '@/widgets/modals'
import { Box, Divider, List, TextField, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { t } from 'i18next'
import { useState } from 'react'

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
	const [editingProject, setEditingProject] = useState<Project | null>(null)
	const collection = groupByPriority(projects)
	const { searchQuery, setSearchQuery, filteredCollection } = useSearchPriorityEntity({
		/// @ts-ignore
		collection,
		searchFields: ['description'],
	})
	const queryClient = useQueryClient()

	const PriorityList = ({ projects, priority }: { projects: Project[]; priority: string }) => {
		return (
			<>
				<Typography color='#dc651e' fontStyle={'italic'}>{`${priority} priority`}</Typography>
				{projects?.map((project, index) => (
					<ListWithActions
						key={`project_${priority}_${index}`}
						onClick={() => set(project)}
						actions={{
							deleteAction: () => deleteProjectById(project.projectId, queryClient),
							editAction: () => {
								setEditingProject(project)
								setOpen(true)
							},
						}}
						boxStyles={{
							borderRadius: '0.3em',
							backgroundColor: selectedProject === project ? '#989488' : null,
						}}
					>
						<Typography fontSize={14}>{project.description}</Typography>
					</ListWithActions>
				))}

				<Divider orientation='horizontal' variant='middle' flexItem sx={{ margin: '1em' }} />
			</>
		)
	}

	return (
		<List
			sx={{
				width: '15%',
				minWidth: '6em',
				height: '100%',
				alignSelf: 'stretch',
				overflowY: 'auto',
				p: 1.5,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box sx={{ mb: 2 }}>
				<Typography
					variant='body2'
					sx={{
						mb: 0.5,
						fontWeight: 500,
						fontSize: '0.85rem',
						color: 'text.secondary',
					}}
				>
					{t('project.search')}
				</Typography>

				<TextField
					fullWidth
					variant='filled'
					size='small'
					hiddenLabel
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					slotProps={{
						input: {
							'aria-label': 'search',
							sx: {
								fontSize: '0.875rem',
							},
						},
						root: {
							sx: {
								borderRadius: 1,
								backgroundColor: theme => theme.palette.background.paper,
							},
						},
					}}
				/>
			</Box>

			{projects === undefined ? (
				<ContainerPlaceholder placeholder={t('project.createProject')} fullHeight={false} />
			) : (
				<>
					{(['high', 'middle', 'low'] as const).map(priority => {
						const items = filteredCollection[priority]
						if (!items?.length) return null
						return (
							<PriorityList
								key={priority}
								projects={items}
								priority={priority.charAt(0).toUpperCase() + priority.slice(1)}
							/>
						)
					})}
				</>
			)}

			<Box mt='auto' pt={1}>
				<AddCircleButton onClick={() => setOpen(true)} iconSize='medium' />
			</Box>

			<ProjectModalWindow
				open={open}
				editingProject={editingProject}
				handleClose={() => {
					setOpen(false)
					if (editingProject) setEditingProject(null)
				}}
			/>
		</List>
	)
}
