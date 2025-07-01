import { useManageTasks } from '@/features/task/useManageTasks'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { DefaultObjectString } from '@/shared/constants/constants'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import { Box, Checkbox, TextField, Typography, useTheme } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Task } from '../../../entities/Task'
import { deleteTask, editTask } from '../../api/taskRoutes'
import { ListWithActions } from './ListWithActions'

type ListItemTask = {
	task: Task
	afterSubmit?: () => void
	sx?: DefaultObjectString
}

export const ListItemTask = ({ task, afterSubmit, sx = {} }: ListItemTask) => {
	const { taskId, name, isDraft, status, projectId } = task
	const [value, setValue] = useState(status)
	const [open, setOpen] = useState<boolean>(false)
	const [isEditable, setIsEditable] = useState<boolean>(isDraft || false)
	const [editedText, setEditedText] = useState(task.name || '')
	const queryClient = useQueryClient()
	const theme = useTheme()
	const { submitEditedTask } = useManageTasks({ editedText, isEditable, setIsEditable })

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
					...sx,
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
						color: theme.palette.text.primary,
						display: isEditable ? 'none' : 'block',
						'&.Mui-checked': {
							color: theme.palette.text.primary,
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
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
								p: 1,
								borderRadius: 2,
								border: '1px solid gray',
								boxShadow: 1,
								maxWidth: 400,
							}}
						>
							<TextField
								size='small'
								variant='outlined'
								value={editedText}
								onChange={e => setEditedText(e.target.value)}
								placeholder='Введите текст...'
								fullWidth
							/>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									mt: 0.5,
								}}
							>
								{/* Левая кнопка */}
								<CustomIconButton
									iconName='launchModal'
									onClick={() => setOpen(true)}
									tooltip='Дополнительно'
								/>

								<Box sx={{ display: 'flex', gap: 0.1 }}>
									<CustomIconButton
										iconName='clear'
										onClick={() => {
											afterSubmit?.()
										}}
										tooltip='Отмена'
									/>
									<CustomIconButton
										iconName='submit'
										onClick={() => {
											submitEditedTask({ ...task, name: editedText })
											afterSubmit?.()
										}}
										sx={{ backgroundColor: '#400101' }}
										tooltip='Сохранить'
									/>
								</Box>
							</Box>
						</Box>
					</>
				)}
			</ListWithActions>
			<CreateEditEntityModalWindow
				open={open}
				handleClose={() => setOpen(false)}
				type='Task'
				defaultDate={dayjs()}
				editEntityItem={{ ...task }}
				submit={(values: any) => {
					submitEditedTask({ ...task, ...values })
					setOpen(false)
				}}
			/>
		</>
	)
}
