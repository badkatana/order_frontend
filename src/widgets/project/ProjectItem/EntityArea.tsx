import { AddCircleButton, ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { Box } from '@mui/material'
import { useState } from 'react'

export const EntityArea = ({
	title = 'Entity',
	children,
	modalConfig = undefined,
}: {
	title: string | undefined | null
	children: any
	modalConfig?: any
}) => {
	const [open, setOpen] = useState(false)

	return (
		<Box
			sx={{
				flex: '1 1 30%',
				display: 'flex',
				flexDirection: 'column',
				borderStyle: 'solid',
				borderColor: '#606162',
				borderRadius: '1em',
				padding: '1em',
				minWidth: '25%',
			}}
		>
			<Box sx={{ marginBottom: '0.5em', fontWeight: 'bold' }}>{title}</Box>
			{children}
			<AddCircleButton iconSize='small' onClick={() => setOpen(true)} />
			{/* Модальное окно */}
			{modalConfig && (
				<ModalBody open={open} handleClose={() => setOpen(false)} title={modalConfig.title || undefined}>
					<GeneralForm config={modalConfig.config} submitFunction={modalConfig.submitFunction} />
				</ModalBody>
			)}
		</Box>
	)
}
