import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import { t } from 'i18next'

type TaskStats = {
	tasksTotal: number
	tasksCompleted: number
	tasksOverdue: number
	averageCompletionDelayHours: number
	completionRatePerDay: Record<string, number>
}

export const TaskStatsCard = ({ tasksTotal, tasksCompleted, tasksOverdue, averageCompletionDelayHours }: TaskStats) => {
	return (
		<Card sx={{ minWidth: 260, borderRadius: 2, boxShadow: 1 }}>
			<CardContent>
				<Typography variant='h6' gutterBottom>
					{t('stats.taskStats')}
				</Typography>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>{t('stats.taskTotal')}</Typography>
					<Typography fontWeight={500}>{tasksTotal || 0}</Typography>
				</Box>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>{t('stats.completed')}</Typography>
					<Typography fontWeight={500}>{tasksCompleted || 0}</Typography>
				</Box>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>{t('stats.overdue')}</Typography>
					<Typography fontWeight={500}>{tasksOverdue || 0}</Typography>
				</Box>

				<Divider sx={{ my: 1 }} />

				<Box display='flex' justifyContent='space-between'>
					<Typography variant='body2'>{t('stats.delay')}</Typography>
					<Typography fontWeight={500}>{averageCompletionDelayHours || 0}</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}
