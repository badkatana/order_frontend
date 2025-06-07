import { useAppStore } from '@/app'
import { CALENDAR_ITEM, DATE_FORMAT, SCROLLBAR } from '@/shared/constants/constants'
import { AddCircleButton, ContainerPlaceholder, FileUploadButton } from '@/shared/ui'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { uploadScheduleFromModeus } from '@/widgets/lib/submitForm'
import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
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
				<Typography>Tasks</Typography>
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
					Статистика задач
				</Typography>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>Всего задач</Typography>
					<Typography fontWeight={500}>{tasksTotal}</Typography>
				</Box>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>Завершено</Typography>
					<Typography fontWeight={500}>{tasksCompleted}</Typography>
				</Box>

				<Box display='flex' justifyContent='space-between' mb={1}>
					<Typography variant='body2'>Просрочено</Typography>
					<Typography fontWeight={500}>{tasksOverdue}</Typography>
				</Box>

				<Divider sx={{ my: 1 }} />

				<Box display='flex' justifyContent='space-between'>
					<Typography variant='body2'>Ср. задержка (ч)</Typography>
					<Typography fontWeight={500}>{averageCompletionDelayHours}</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

const BoxContainerStyles = {
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
}
