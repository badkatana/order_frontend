import { VerticalAppBar, WorkingArea } from '@/widgets'
import { Box, useTheme } from '@mui/material'
import { ReactNode, useState } from 'react'

export const WithPageWrapper = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false)
	const theme = useTheme()

	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<>
			<VerticalAppBar open={open} toggleDrawer={toggleDrawer} />
			<Box
				sx={{
					width: '95%',
					minHeight: '100vh',
					backgroundColor: theme.palette.background.default,
				}}
			>
				<WorkingArea>{children}</WorkingArea>
			</Box>
		</>
	)
}
