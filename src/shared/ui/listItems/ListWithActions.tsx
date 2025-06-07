import { Box, ListItem } from '@mui/material'
import { ListItemActions } from './ListItemAction'

export const ListWithActions = ({
	children,
	actions,
	iconStyles = {},
	boxStyles = {},
	actionsStyles = {},
	onClick = undefined,
	isEditable = false,
	...props
}) => {
	return (
		<ListItem
			sx={{
				cursor: 'pointer',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				...boxStyles,
				'&:hover .actions': {
					opacity: 1,
				},
			}}
			onClick={onClick}
			{...props}
		>
			<Box display={'flex'} flexDirection={'row'} width={'70%'} alignItems={'center'}>
				{children}
			</Box>
			{!isEditable && <ListItemActions {...actions} {...iconStyles} actionsStyles={actionsStyles} />}
		</ListItem>
	)
}
