import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, IconButton, styled, Typography } from '@mui/material'
import { useState } from 'react'

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

const TaskList = styled(Box)({
	marginTop: '1em',
	padding: '0.5em',
	backgroundColor: '#2E2E33',
	borderRadius: '1em',
})

const TaskItem = styled(Typography)({
	padding: '0.5em',
	background: '#3A3A40',
	borderRadius: '0.5em',
	marginBottom: '0.5em',
})

const ProjectCard = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	background: 'linear-gradient(#1E1E22 40%, #8D8D8F)',
	borderStyle: 'solid',
	borderColor: '#606162',
	borderRadius: '2em',
	overflow: 'hidden',
	transition: 'all 0.3s ease', // Плавная анимация
})

const ProjectHeader = styled(Box)<{ priority: number }>(({ priority }) => ({
	display: 'flex',
	flexDirection: 'row',
	background: priority >= 3 ? 'red' : priority >= 2 ? 'blue' : 'grey',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1em',
}))

const ProjectName = styled(Typography)({
	flex: 1,
	fontWeight: 'bold',
})

const ProjectDeadline = styled(Typography)({
	marginLeft: '1em',
})

const ProjectContent = styled(Box)<{ isExpanded: boolean }>(({ isExpanded }) => ({
	maxHeight: isExpanded ? '20em' : '5em',
	overflow: 'hidden',
	transition: 'max-height 0.3s ease', // Анимация изменения высоты
	padding: '1em',
}))

const ProjectStatistic = styled(Box)({
	marginBottom: '1em',
})
