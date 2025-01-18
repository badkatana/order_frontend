import { VerticalAppBar, WorkingArea } from '@/widgets'
import { Box } from '@mui/material'
import { useState } from 'react'

// @ts-ignore
export const WithPageWrapper = ({ children }) => {
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
