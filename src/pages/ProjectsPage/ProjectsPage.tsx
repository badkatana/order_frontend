import { useAppStore } from '@/app'
import { getAllProjects } from '@/shared/api'
import { ContainerPlaceholder } from '@/shared/ui'
import { WithPageWrapper } from '@/shared/ui/WithPageWrapper'
import { ProjectItem, ProjectsList } from '@/widgets/project'
import { Divider } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ProjectPageWrapper } from './styles'

export const ProjectsPage = () => {
	const { selectedProject, setSelectedProject } = useAppStore()

	const { data: projects, isFetching } = useQuery({
		queryKey: ['projects'],
		queryFn: getAllProjects,
		refetchInterval: Infinity, // потом убрать
	})

	if (isFetching) return <ContainerPlaceholder progress fullHeight />

	return (
		<WithPageWrapper>
			<ProjectPageWrapper>
				<ProjectsList projects={projects} set={setSelectedProject} selectedProject={selectedProject} />
				<Divider orientation='vertical' variant='middle' flexItem sx={{ margin: '1em' }} />
				<ProjectItem project={selectedProject} />
			</ProjectPageWrapper>
		</WithPageWrapper>
	)
}
