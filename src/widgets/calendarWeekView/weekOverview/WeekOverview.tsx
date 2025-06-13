import { useAppStore } from '@/app'
import { getRecommendations } from '@/shared/api/taskRoutes'
import { CALENDAR_ITEM, DATE_FORMAT, SCROLLBAR } from '@/shared/constants/constants'
import { getIcon } from '@/shared/icons/icons'
import { AddCircleButton, ContainerPlaceholder, FileUploadButton } from '@/shared/ui'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { uploadScheduleFromModeus } from '@/widgets/lib/submitForm'
import AssistantIcon from '@mui/icons-material/Assistant'
import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { UploadButton } from '../CalendarStyles'
import { WeekPicker } from './WeekPeeker'

export const WeekOverview = ({
	calendarItem,
	setOpen,
	overview,
}: {
	calendarItem: CALENDAR_ITEM
	overview?: Record<string, any>
	setOpen: (flag: boolean) => void
}) => {
	const { setSavedWeek, savedDate } = useAppStore()
	const { t } = useTranslation()
	const response = getRecommendations()
	const assistantIcon = getIcon('sparkle')

	return (
		<Box width={'25%'} display={'flex'} flexDirection={'column'} gap={'1em'} maxHeight={'90vh'}>
			<WeekPicker onChange={(monday, sunday) => setSavedWeek({ monday, sunday })} />
			<FileUploadButton
				onUpload={uploadScheduleFromModeus}
				buttonText={t('upload_schedule')}
				accept='.ics'
				buttonStyle={UploadButton}
			/>
			<Box sx={BoxContainerStyles}>
				<Box sx={{ position: 'absolute', top: 8, right: 8 }}>
					<IconButton onClick={() => console.log('')} size='small'>
						<AssistantIcon />
					</IconButton>
				</Box>

				<Typography>{t('task.titlePlural')}</Typography>
				{calendarItem[savedDate.format(DATE_FORMAT)]?.tasks.length === 0 && <ContainerPlaceholder fullHeight />}
				{calendarItem[savedDate.format(DATE_FORMAT)]?.tasks.map((task, index) => (
					<ListItemTask key={`${task.name}_${index}_${savedDate.format(DATE_FORMAT)}`} task={task} />
				))}
				<AddCircleButton
					iconSize='small'
					onClick={_ => {
						setOpen(true)
					}}
				/>
			</Box>
			<Box>
				<TaskStatsCard {...overview} />
			</Box>
		</Box>
	)
}

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
					<Typography fontWeight={500}>{tasksTotal || 15}</Typography>
				</Box>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>{t('stats.completed')}</Typography>
					<Typography fontWeight={500}>{tasksCompleted || 6}</Typography>
				</Box>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>{t('stats.overdue')}</Typography>
					<Typography fontWeight={500}>{tasksOverdue || 1}</Typography>
				</Box>

				<Divider sx={{ my: 1 }} />

				<Box display='flex' justifyContent='space-between'>
					<Typography variant='body2'>{t('stats.delay')}</Typography>
					<Typography fontWeight={500}>{averageCompletionDelayHours || 2}</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

const BoxContainerStyles = {
	padding: 1,
	borderRadius: '0.5em',
	borderColor: 'grey',
	border: '0.1em solid gray',
	display: 'flex',
	minHeight: '25em',
	height: '40%',
	overflowY: 'scroll',
	...SCROLLBAR,
	flexDirection: 'column',
	alignItems: 'center',
	position: 'relative', // добавляем для абсолютного позиционирования
}
