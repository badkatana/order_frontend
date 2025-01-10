import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { WithPageWrapper } from '@/shared/ui/WithPageWrapper'
import { ProjectItem } from '@/widgets/ProjectItem'
import { WorkingArea } from '@/widgets/WorkingArea'
import { Box, styled } from '@mui/material'
import { ProjectPageWrapper } from './styles'

export const ProjectsPage = () => {
	const userProjects = synthProjects
	const userTasks = synthTasks

	// Стиль для сетки
	const GridStyle = styled(Box)<{ columns: number }>(({ columns }) => ({
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: '16px',
		gridAutoRows: '1fr',
	}))

	return (
		<WithPageWrapper>
			<WorkingArea>
				<ProjectPageWrapper>
					<GridStyle columns={2}>
						{userProjects.map((project, index) => (
							<ProjectItem project={project} key={index} />
						))}
					</GridStyle>
				</ProjectPageWrapper>
			</WorkingArea>
		</WithPageWrapper>
	)
}

const synthProjects: Project[] = [
	{
		userId: 'admin',
		priority: 1,
		status: true,
		description: 'First Project',
		hardDeadline: '2024-01-11',
		taskIds: [1, 2, 3],
		id: 1,
	},
	{
		userId: 'admin',
		status: true,
		description: 'Second Project',
		hardDeadline: '2024-01-11',
		taskIds: [10, 11],
		id: 1,
	},
]

const synthTasks: Task[] = [
	{
		userId: 'admin',
		name: 'task 1',
		status: false,
		hardDeadline: '2024-01-11',
		id: 1,
	},
	{
		userId: 'admin',
		name: 'task 2',
		status: false,
		id: 2,
	},
	{
		userId: 'admin',
		name: 'task 3',
		status: false,
		id: 3,
	},
	{
		userId: 'admin',
		name: 'task 10',
		status: false,
		id: 10,
	},
	{
		userId: 'admin',
		name: 'task 11',
		status: false,
		id: 11,
	},
]
