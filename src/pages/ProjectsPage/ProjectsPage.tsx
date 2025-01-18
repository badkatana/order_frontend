import { getAllProjects } from '@/shared/api'
import { WithPageWrapper } from '@/shared/ui/WithPageWrapper'
import { ProjectItem, ProjectsList } from '@/widgets/project'
import { Divider } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ProjectPageWrapper } from './styles'

export const ProjectsPage = () => {
	const [selectedProject, setSelectedProject] = useState(null)

	const { data: projects, isFetching } = useQuery({
		queryKey: ['projects'],
		queryFn: () => getAllProjects(),
	})

	if (isFetching) return <></>

	return (
		<WithPageWrapper>
			<ProjectPageWrapper>
				{/*  @ts-ignore */}
				<ProjectsList projects={projects?.$values} set={setSelectedProject} selectedProject={selectedProject} />
				<Divider orientation='vertical' variant='middle' flexItem sx={{ margin: '1em' }} />
				{/*  @ts-ignore */}
				<ProjectItem project={selectedProject} />
			</ProjectPageWrapper>
		</WithPageWrapper>
	)
}
