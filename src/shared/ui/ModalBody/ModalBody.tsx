import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { BlurredOverlay, style } from './ModalBodyStyles'

/*  @ts-ignore */

export const ModalBody = ({ children, open, handleClose, title, sx = {} }) => {
	const { t, i18n } = useTranslation()
	const isTranslationMissing = !i18n.exists(title)

	return (
		<Modal open={open} onClose={handleClose}>
			<BlurredOverlay>
				<Box sx={{ ...style, ...sx }} display={'flex'} flexDirection={'column'}>
					<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
						<Typography id='modal-modal-title' variant='h6' component='h2' color='white'>
							{isTranslationMissing ? title : t(title)}
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
