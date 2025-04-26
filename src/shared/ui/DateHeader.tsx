import { Box } from '@mui/material'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)

type DateProps = {
	date: string
}

export const DateHeader = (props: DateProps) => {
	const correctDate = dayjs(props.date, 'YYYY-MM-DD')

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
			<Box key={`date-time`} sx={{ fontDize: '3em', fontWeight: 400 }}>
				{correctDate.format('ddd').toString()}
			</Box>
			<Box key={`date`} sx={{ fontSize: '3em', fontWeight: 600, margin: '0.1em' }}>
				{dayjs(correctDate).date().toString()}
			</Box>
		</Box>
	)
}
