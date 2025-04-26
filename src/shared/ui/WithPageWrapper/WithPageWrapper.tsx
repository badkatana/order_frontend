import { VerticalAppBar, WorkingArea } from '@/widgets'
import { Box } from '@mui/material'
import { ReactNode, useState } from 'react'

export const WithPageWrapper = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false)

	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<>
			<VerticalAppBar open={open} toggleDrawer={toggleDrawer} />
			<Box sx={{ width: '95%' }}>
				<WorkingArea>{children}</WorkingArea>
			</Box>
		</>
	)
}
