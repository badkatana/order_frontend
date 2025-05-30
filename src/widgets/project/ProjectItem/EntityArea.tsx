import { AddCircleButton } from '@/shared/ui'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
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
			{modalConfig && (
				<CreateEditEntityModalWindow
					type={modalConfig.type}
					open={open}
					handleClose={() => setOpen(false)}
					submit={modalConfig.submitFunction}
				/>
			)}
		</Box>
	)
}
