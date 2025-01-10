import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import {
	ProjectCard,
	ProjectContent,
	ProjectDeadline,
	ProjectHeader,
	ProjectName,
	ProjectStatistic,
	TaskItem,
	TaskList,
} from './styles'

export const ProjectItem = ({ project, tasks }: { project?: Project; tasks?: Task[] }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleExpand = () => {
		setIsExpanded(prev => !prev)
	}

	const { description, hardDeadline, priority, taskIds } = project || {}

	return (
		<ProjectCard>
			<ProjectHeader priority={Number(priority)}>
				<ProjectName>{description || 'Без названия'}</ProjectName>
				<ProjectDeadline>{hardDeadline || 'Дедлайн не указан'}</ProjectDeadline>
				<IconButton onClick={toggleExpand}>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
			</ProjectHeader>
			<ProjectContent isExpanded={isExpanded}>
				<ProjectStatistic>Всего задач: {taskIds?.length || 0}</ProjectStatistic>
				{isExpanded && (
					<TaskList>
						{tasks?.map(task => <TaskItem key={task.id}>{task.name}</TaskItem>) || (
							<Typography>Задач нет</Typography>
						)}
					</TaskList>
				)}
			</ProjectContent>
		</ProjectCard>
	)
}
