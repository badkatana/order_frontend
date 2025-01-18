import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { Box, IconButton } from '@mui/material'

type ListItemActionsProps = {
	deleteAction: () => void
	editAction: () => void
}

export const ListItemActions = ({ deleteAction, editAction }: ListItemActionsProps) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto' }}>
			<IconButton
				sx={{
					color: 'white',
				}}
				onClick={editAction}
			>
				<ModeEditOutlineOutlinedIcon />
			</IconButton>
			<IconButton
				sx={{
					color: 'white',
				}}
				onClick={deleteAction}
			>
				<DeleteOutlineOutlinedIcon />
			</IconButton>
		</Box>
	)
}
