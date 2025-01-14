import { Project } from '@/entities/Project'
import { AddCircleButton, ContainerPlaceholder } from '@/shared/ui'
import { ProjectModalWindow } from '@/widgets/modals/ProjectModalWindow'
import { List, ListItem } from '@mui/material'
import { useState } from 'react'

export const ProjectsList = ({
	projects,
	selectedProject,
	set,
}: {
	projects: Project[]
	selectedProject: Project | null | undefined
	set: (value: Project) => void
}) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<List sx={{ width: '15%', minWidth: '6em', height: 'inherit', alignSelf: 'stretch' }}>
				{projects === undefined ? (
					<ContainerPlaceholder placeholder='Empty for now on' fullHeight={false} />
				) : (
					projects?.map((project, index) => (
						<ListItem
							button
							sx={{
								cursor: 'pointer',
								backgroundColor: selectedProject === project ? '#989488' : null,
							}}
							key={`project_${index}`}
							onClick={() => set(project)}
						>
							{project.description}
						</ListItem>
					))
				)}

				<AddCircleButton onClick={() => setOpen(true)} iconSize='medium' />
				<ProjectModalWindow open={open} handleClose={() => setOpen(false)} />
			</List>
		</>
	)
}
