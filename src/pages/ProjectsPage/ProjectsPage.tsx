import { WithPageWrapper } from '@/shared/ui/WithPageWrapper'
import { ProjectItem } from '@/widgets/ProjectItem'
import { WorkingArea } from '@/widgets/WorkingArea'
import { Box, styled } from '@mui/material'

export const ProjectsPage = () => {
	return (
		<WithPageWrapper>
			<WorkingArea>
				<CalendarWrapper>
					<PageCalendar>
						<ProjectItem />
					</PageCalendar>
				</CalendarWrapper>
				{/* <Box sx={{ width: '95%', height: '100%' }}></Box> */}
			</WorkingArea>
		</WithPageWrapper>
	)
}

export const CalendarWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	padding: '1em',
	overflowX: 'auto',
	overflowY: 'hidden',
	maxWidth: '100%',
})

export const PageCalendar = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
})
