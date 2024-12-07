import styled from '@emotion/styled'
import { Checkbox, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Task } from '../../../entities/Task'

type ListItemTask = {
	task: Task
	taskClick: (value) => void
}

export const ListItemTask = (props: ListItemTask) => {
	const { task, taskClick } = props
	return (
		<ListItemTaskWrapper>
			{/* todo: instead of click call api */}
			<Checkbox
				key={task.id + '_check'}
				defaultChecked={task.status ?? false}
				onClick={taskClick}
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
	flexDirection: 'row',
	margin: 0,
	padding: 0,
})
