import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { Box } from '@mui/material'

type ListItemActionsProps = {
	deleteAction: () => void
	editAction: () => void
	isEditable?: boolean
	saveAction?: () => void
	cancelAction?: () => void
}

export const ListItemActions = ({
	deleteAction,
	editAction,
	isEditable,
	saveAction,
	cancelAction,
}: ListItemActionsProps) => {
	const getUserActions = () => {
		if (!isEditable) {
			return [
				{
					iconName: 'editIcon',
					onClick: editAction,
					key: 'edit',
				},
				{ iconName: 'delete', onClick: deleteAction, key: 'delete' },
			]
		}

		return [
			{ iconName: 'save', onClick: saveAction, key: 'save' },
			{ iconName: 'cancel', onClick: cancelAction, key: 'cancel' },
		]
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', color: 'white', width: '1em' }}>
			{getUserActions().map(button => (
				<CustomIconButton
					sx={{
						color: 'white',
					}}
					{...button}
				/>
			))}
		</Box>
	)
}
