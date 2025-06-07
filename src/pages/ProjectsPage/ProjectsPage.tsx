import { useAppStore } from '@/app'
import { getAllProjects } from '@/shared/api'
import { ContainerPlaceholder } from '@/shared/ui'
import { WithPageWrapper } from '@/shared/ui/WithPageWrapper'
import { ProjectItem, ProjectsList } from '@/widgets/project'
import { Divider } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ProjectPageWrapper } from './styles'

export const ProjectsPage = () => {
	const { selectedProject, setSelectedProject } = useAppStore()

	const { data: projects, isFetching } = useQuery({
		queryKey: ['projects'],
		queryFn: getAllProjects,
	})

	useEffect(() => {
		if (projects && selectedProject) {
			const updated = projects.find(p => p.projectId === selectedProject.projectId)
			if (updated) setSelectedProject(updated)
		}
	}, [projects])

	if (isFetching) return <ContainerPlaceholder progress fullHeight />
	return (
		<WithPageWrapper>
			<ProjectPageWrapper>
				<ProjectsList projects={projects} set={setSelectedProject} selectedProject={selectedProject} />
				<Divider orientation='vertical' variant='middle' flexItem sx={{ margin: '1em' }} />
				<ProjectItem />
			</ProjectPageWrapper>
		</WithPageWrapper>
	)
}
