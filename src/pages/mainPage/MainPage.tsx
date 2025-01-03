import { WithPageWrapper } from '../../shared/ui/WithPageWrapper/WithPageWrapper'
import { CalendarWeek } from '../../widgets/CalendarWeek'
import { WorkingArea } from '../../widgets/WorkingArea'

export const MainPage = () => {
	return (
		<WithPageWrapper>
			<WorkingArea>
				<CalendarWeek />
			</WorkingArea>
		</WithPageWrapper>
	)
}
