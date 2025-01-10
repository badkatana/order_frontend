import { WithPageWrapper } from '@/shared/ui/WithPageWrapper/WithPageWrapper'
import { CalendarWeek } from '@/widgets'
import { WorkingArea } from '@/widgets/WorkingArea'

export const MainPage = () => {
	return (
		<WithPageWrapper>
			<WorkingArea>
				<CalendarWeek />
			</WorkingArea>
		</WithPageWrapper>
	)
}
