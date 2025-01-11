import { Box, styled, Typography } from '@mui/material'

export const TaskList = styled(Box)({
	marginTop: '1em',
	padding: '0.5em',
	backgroundColor: '#2E2E33',
	borderRadius: '1em',
})

export const TaskItem = styled(Typography)({
	padding: '0.5em',
	background: '#3A3A40',
	borderRadius: '0.5em',
	marginBottom: '0.5em',
})

export const ProjectCard = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	background: 'linear-gradient(#1E1E22 40%, #8D8D8F)',
	borderStyle: 'solid',
	borderColor: '#606162',
	borderRadius: '2em',
	overflow: 'hidden',
	transition: 'all 0.3s ease', // Плавная анимация
})

export const ProjectHeader = styled(Box)<{ priority: number }>(({ priority }) => ({
	display: 'flex',
	flexDirection: 'row',
	background: priority >= 3 ? 'red' : priority >= 2 ? 'blue' : 'grey',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1em',
}))

export const ProjectName = styled(Typography)({
	flex: 1,
	fontWeight: 'bold',
})

export const ProjectDeadline = styled(Typography)({
	marginLeft: '1em',
})

export const ProjectContent = styled(Box)<{ isExpanded: boolean }>(({ isExpanded }) => ({
	maxHeight: isExpanded ? '20em' : '5em',
	overflow: 'hidden',
	transition: 'max-height 0.3s ease', // Анимация изменения высоты
	padding: '1em',
}))

export const ProjectStatistic = styled(Box)({
	marginBottom: '1em',
})
