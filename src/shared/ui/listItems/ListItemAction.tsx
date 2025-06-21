import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { Box } from '@mui/material'
import { theme } from '../theme'

type ListItemActionsProps = {
	deleteAction: () => void
	editAction: () => void
	isEditable?: boolean
	saveAction?: () => void
	actionsStyles?: Record<string, any>
	cancelAction?: () => void
}

export const ListItemActions = ({
	deleteAction,
	editAction,
	isEditable,
	saveAction,
	cancelAction,
	actionsStyles = {},
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
		<Box
			className={'actions'}
			sx={{
				flex: '0 0 30%',
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'center',
				color: theme.palette.text.secondary,
				opacity: 0,
				gap: 1,
				transition: 'opacity 0.3s',
				'& svg': {
					fontSize: 18,
				},
				'& .MuiButton-root': {
					minWidth: 'unset',
					width: 28,
					height: 28,
					padding: '4px',
					lineHeight: 1,
				},
				...actionsStyles,
			}}
		>
			{getUserActions().map(button => (
				<CustomIconButton sx={{}} {...button} />
			))}
		</Box>
	)
}
