import styled from '@emotion/styled'
import { Checkbox, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import { Task } from '../../../entities/Task'
import { changeTask } from '../../api/taskRoutes'

type ListItemTask = {
	task: Task
}

export const ListItemTask = (props: ListItemTask) => {
	const { task } = props
	const [value, setValue] = useState(task.status)
	return (
		<ListItemTaskWrapper>
			{/* todo: instead of click call api */}
			<Checkbox
				key={task.id + '_check'}
				defaultChecked={value ?? false}
				onClick={e => {
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
