import { submitEditedTask } from '@/widgets/lib/submitForm/submitFunctions'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import styled from '@emotion/styled'
import { Checkbox, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import { Task } from '../../../entities/Task'
import { deleteTask, editTask } from '../../api/taskRoutes'
import { ListItemActions } from './ListItemAction'

type ListItemTask = {
	task: Task
}

export const ListItemTask = ({ task }: ListItemTask) => {
	const [value, setValue] = useState(task.status)
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<ListItemTaskWrapper>
				<Checkbox
					key={task.id + '_check'}
					defaultChecked={value ?? false}
					onClick={() => {
						setValue(!value)
						editTask({ ...task, status: !value })
					}}
					sx={{
						color: 'white',
						'&.Mui-checked': {
							color: 'white',
						},
					}}
				/>
				<ListItemText key={task.id} primary={task.name} />
				<ListItemActions deleteAction={() => deleteTask(task.id)} editAction={() => setOpen(true)} />
			</ListItemTaskWrapper>
			<CreateEditEntityModalWindow
				open={open}
				handleClose={() => setOpen(false)}
				type='Task'
				method='edit'
				editEntityItem={task}
				submit={(values: any) => submitEditedTask({ ...task, ...values })}
			/>
		</>
	)
}

const ListItemTaskWrapper = styled(ListItem)({
	display: 'flex',
	fontSize: '0.4em',
	flexDirection: 'row',
	margin: 0,
	padding: 0,
})
