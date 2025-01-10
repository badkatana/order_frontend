import { WithPageWrapper } from '@/shared/ui/WithPageWrapper/WithPageWrapper'
import { CalendarWeek } from '@/widgets'

export const MainPage = () => {
	return (
		<WithPageWrapper>
			<CalendarWeek />
		</WithPageWrapper>
	)
}
