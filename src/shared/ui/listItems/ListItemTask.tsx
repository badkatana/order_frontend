import { useManageTasks } from '@/features/task/useManageTasks'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Task } from '../../../entities/Task'
import { deleteTask, editTask } from '../../api/taskRoutes'
import { ListWithActions } from './ListWithActions'

type ListItemTask = {
	task: Task
}

export const ListItemTask = ({ task }: ListItemTask) => {
	const { taskId, name, isDraft, status, projectId } = task
	const [value, setValue] = useState(status)
	const [open, setOpen] = useState<boolean>(false)
	const [isEditable, setIsEditable] = useState<boolean>(task.isDraft || false)
	const [editedText, setEditedText] = useState(task.name || '')
	const queryClient = useQueryClient()
	const { submitEditedTask } = useManageTasks({ isEditable, setIsEditable })

	return (
		<>
			<ListWithActions
				key={`task_${taskId}_list_item`}
				actions={{
					deleteAction: () => {
						deleteTask(taskId)
						const queryKey = projectId ? ['projects'] : ['calendar']
						queryClient.refetchQueries({ queryKey, exact: false })
					},
					editAction: () => setOpen(true),
				}}
				isEditable={isEditable}
				actionsStyles={{
					display: isEditable ? 'none' : 'flex',
				}}
			>
				<Checkbox
					key={taskId + '_check'}
					defaultChecked={value ?? false}
					onClick={() => {
						setValue(!value)
						editTask({ ...task, status: !value })
					}}
					sx={{
						color: 'white',
						display: isEditable ? 'none' : 'block',
						'&.Mui-checked': {
							color: 'white',
						},
					}}
				/>
				{!isEditable && (
					<>
						<Typography
							key={`${taskId}_name`}
							sx={{ fontSize: '0.8rem', textDecoration: value ? 'line-through' : 'none' }}
						>
							{name}
						</Typography>
					</>
				)}
				{isEditable && (
					<>
						<Box>
							<TextField onChange={e => setEditedText(e.target.value)} value={editedText} />
							<Button onClick={() => submitEditedTask(task)}>Submit</Button>
						</Box>
					</>
				)}
			</ListWithActions>
			<CreateEditEntityModalWindow
				open={open}
				handleClose={() => setOpen(false)}
				type='Task'
				method='edit'
				editEntityItem={{ ...task }}
				submit={(values: any) => {
					submitEditedTask({ ...task, ...values })
					setOpen(false)
				}}
			/>
		</>
	)
}
