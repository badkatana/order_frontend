import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import { BlurredOverlay, style } from './ModalBodyStyles'

/*  @ts-ignore */

export const ModalBody = ({ children, open, handleClose, title }) => {
	return (
		<Modal open={open} onClose={handleClose}>
			<BlurredOverlay>
				<Box sx={style} display={'flex'} flexDirection={'column'}>
					<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
						<Typography id='modal-modal-title' variant='h6' component='h2' color='white'>
							{title}
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</Box>
					{children}
				</Box>
			</BlurredOverlay>
		</Modal>
	)
}
