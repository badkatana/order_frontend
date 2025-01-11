import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Box, IconButton } from '@mui/material'

export const AddCircleButton = ({
	onClick,
	iconSize = 'large',
}: {
	onClick: (value?: any) => void
	iconSize?: 'large' | 'medium'
}) => {
	return (
		<>
			<Box display={'flex'} justifyContent={'center'}>
				<IconButton color={'inherit'} onClick={onClick}>
					<AddCircleOutlineOutlinedIcon fontSize={iconSize} />
				</IconButton>
			</Box>
		</>
	)
}
