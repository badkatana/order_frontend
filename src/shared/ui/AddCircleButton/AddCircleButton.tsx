import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Box, IconButton, Tooltip } from '@mui/material'

export const AddCircleButton = ({
	onClick,
	iconSize = 'large',
	tooltip = undefined,
}: {
	onClick: (value?: any) => void
	iconSize?: 'large' | 'medium' | 'small'
	tooltip?: string | null | undefined
}) => {
	return (
		<>
			<Box display={'flex'} justifyContent={'center'}>
				<Tooltip title={tooltip}>
					<IconButton color={'inherit'} onClick={onClick}>
						<AddCircleOutlineOutlinedIcon fontSize={iconSize} />
					</IconButton>
				</Tooltip>
			</Box>
		</>
	)
}
