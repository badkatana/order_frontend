import { getFormattedDateOrNull } from '@/shared/helper/getFormattedDate'
import { Typography } from '@mui/material'

export const DeadlinesComponent = ({
	variant,
	date,
}: {
	variant: 'soft' | 'hard'
	date: undefined | null | string
}) => {
	const correctDate = getFormattedDateOrNull(date)

	return (
		<Typography
			variant='h6'
			sx={{
				backgroundColor: variant === 'hard' ? 'red' : 'orange',
				borderRadius: '1.5em',
				px: 1,
				display: date ? 'flex' : 'none',
			}}
		>
			{correctDate?.format('DD.MM.YYYY')}
		</Typography>
	)
}
