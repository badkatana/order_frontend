import { Box } from '@mui/material'
import { useState } from 'react'
import { VerticalAppBar } from '../../widgets'
import { CalendarWeek } from '../../widgets/CalendarWeek'
import { WorkingArea } from '../../widgets/WorkingArea'

export const MainPage = () => {
	const [open, setOpen] = useState(false)

	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<>
			<VerticalAppBar open={open} toggleDrawer={toggleDrawer} />
			<Box sx={{ width: '95%' }}>
				<WorkingArea>
					<CalendarWeek />
				</WorkingArea>
			</Box>
		</>
	)
}
