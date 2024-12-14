import styled from '@emotion/styled'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import { Task } from '../../../entities/Task'
import { changeTask, deleteTask } from '../../api/taskRoutes'

type ListItemTask = {
	task: Task
}

export const ListItemTask = (props: ListItemTask) => {
	const { task } = props
	const [value, setValue] = useState(task.status)
	return (
		<ListItemTaskWrapper>
			<Checkbox
				key={task.id + '_check'}
				defaultChecked={value ?? false}
				onClick={() => {
					setValue(!value)
					changeTask({ ...task, status: !value })
				}}
				sx={{
					color: 'white',
					'&.Mui-checked': {
						color: 'white',
					},
				}}
			/>
			<ListItemButton>
				<ListItemText key={task.id} primary={task.name} />
			</ListItemButton>
			<IconButton
				sx={{
					color: 'white',
				}}
				onClick={() => deleteTask(task.id)}
			>
				<DeleteOutlineOutlinedIcon />
			</IconButton>
		</ListItemTaskWrapper>
	)
}

const ListItemTaskWrapper = styled(ListItem)({
	display: 'flex',
	fontSize: '0.4em',
	flexDirection: 'row',
	margin: 0,
	padding: 0,
})
