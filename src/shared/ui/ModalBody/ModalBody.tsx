import { DefaultObjectString } from '@/shared/constants/constants'
import { getTranslatedText } from '@/shared/lib'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import { BlurredOverlay, style } from './ModalBodyStyles'

export const ModalBody = ({
	children,
	open,
	handleClose,
	title = '',
	sx = {},
}: {
	children: React.JSX.Element
	open: boolean
	handleClose: (flag: boolean) => void
	title: string
	sx: DefaultObjectString
}) => {
	return (
		<Modal open={open} onClose={handleClose}>
			<BlurredOverlay>
				<Box sx={{ ...style, ...sx }} display={'flex'} flexDirection={'column'}>
					<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							{getTranslatedText(title)}
						</Typography>
						<IconButton onClick={handleClose} sx={{ color: 'text.primary' }}>
							<CloseOutlinedIcon />
						</IconButton>
					</Box>
					{children}
				</Box>
			</BlurredOverlay>
		</Modal>
	)
}
