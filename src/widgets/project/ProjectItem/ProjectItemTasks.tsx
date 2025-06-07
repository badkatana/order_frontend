import { Task } from '@/entities/Task'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { groupByPriority } from '@/widgets/lib'
import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'

export const ProjectItemTasks = ({ tasks, projectId }: { tasks: Task[] | any[]; projectId: number }) => {
	const [drafts, setDrafts] = useState({})
	const { high, middle, low } = groupByPriority([...tasks, drafts])

	const clearDrafts = () => setDrafts({})

	const renderColumn = (title: string, items: Task[], priority: number) => (
		<Grid item xs={12} sm={4}>
			<Box display={'flex'} flexDirection={'column'}>
				<Typography sx={{ mb: 1, fontSize: '1em' }}>{title}</Typography>
				{items.length === 0 ? (
					<Typography variant='body3' color='text.secondary'>
						No tasks
					</Typography>
				) : (
					items.map(task => <ListItemTask task={task} sx={{ width: '70%' }} />)
				)}
			</Box>
			<CustomIconButton
				iconName={'addCross'}
				sx={{ marginTop: 1 }}
				title={'Add task'}
				onClick={() => setDrafts({ taskId: 'draft-task', isDraft: true, priority, status: false, projectId })}
			></CustomIconButton>
		</Grid>
	)

	return (
		<Box sx={{ px: 2, py: 2 }}>
			<Grid container spacing={2}>
				{renderColumn('High Priority', high as Task[], 1)}
				{renderColumn('Medium Priority', middle as Task[], 2)}
				{renderColumn('Low Priority', low as Task[], 3)}
			</Grid>
		</Box>
	)
}
