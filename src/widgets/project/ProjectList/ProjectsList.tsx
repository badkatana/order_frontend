import { Project } from '@/entities/Project'
import { AddCircleButton, ContainerPlaceholder } from '@/shared/ui'
import { groupProjectsByPriority } from '@/widgets/lib'
import { ProjectModalWindow } from '@/widgets/modals'
import { Divider, List, ListItem, Typography } from '@mui/material'
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

	const PriorityList = ({ projects, priority }: { projects: Project[]; priority: string }): ReactElement => {
		return (
			<>
				<Typography color='#dc651e' fontStyle={'italic'}>{`${priority} priority`}</Typography>
				{projects?.map((project, index) => (
					<ListItem
						sx={{
							cursor: 'pointer',
							backgroundColor: selectedProject === project ? '#989488' : null,
						}}
						key={`project_${priority}_${index}`}
						onClick={() => set(project)}
					>
						{project.description}
					</ListItem>
				))}
				<Divider orientation='horizontal' variant='middle' flexItem sx={{ margin: '1em' }} />
			</>
		)
	}

	return (
		<List sx={{ width: '15%', minWidth: '6em', height: 'inherit', alignSelf: 'stretch' }}>
			{projects === undefined ? (
				<ContainerPlaceholder placeholder='Empty for now on' fullHeight={false} />
			) : (
				<>
					{high.length !== 0 && <PriorityList projects={high} priority='High' />}
					{middle.length !== 0 && <PriorityList projects={middle} priority='Medium' />}
					{low.length !== 0 && <PriorityList projects={low} priority='Low' />}
				</>
			)}

			<AddCircleButton onClick={() => setOpen(true)} iconSize='medium' />
			<ProjectModalWindow open={open} handleClose={() => setOpen(false)} />
		</List>
	)
}
