import { useAppStore } from '@/app'
import { CALENDAR_ITEM, DATE_FORMAT, SCROLLBAR } from '@/shared/constants/constants'
import { AddCircleButton, ContainerPlaceholder, FileUploadButton } from '@/shared/ui'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { uploadScheduleFromModeus } from '@/widgets/lib/submitForm'
import AssistantIcon from '@mui/icons-material/Assistant'
import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UploadButton } from '../CalendarStyles'
import { TaskActivityModal, TaskStatsCard } from './Stats'
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
	const [openModal, setOpenModal] = useState<boolean>(false)
	const theme = useTheme()

	return (
		<Box width={'25%'} display={'flex'} flexDirection={'column'} gap={'1em'} maxHeight={'90vh'}>
			<WeekPicker onChange={(monday, sunday) => setSavedWeek({ monday, sunday })} />
			<FileUploadButton
				onUpload={uploadScheduleFromModeus}
				buttonText={t('upload_schedule')}
				accept='.ics'
				buttonStyle={UploadButton}
			/>
			<Paper sx={BoxContainerStyles}>
				<Box sx={{ position: 'absolute', top: 8, right: 8, color: theme.palette.text.primary }}>
					<IconButton onClick={() => setOpenModal(true)} size='small'>
						<AssistantIcon />
					</IconButton>
				</Box>

				<Typography color={theme.palette.text.primary}>{t('task.titlePlural')}</Typography>
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
			</Paper>
			<Box>
				<TaskStatsCard {...overview} />
				<TaskActivityModal open={openModal} onClose={() => setOpenModal(false)} />
			</Box>
		</Box>
	)
}

const BoxContainerStyles = {
	padding: 1,
	borderRadius: '0.5em',
	display: 'flex',
	minHeight: '25em',
	height: '40%',
	overflowY: 'scroll',
	...SCROLLBAR,
	flexDirection: 'column',
	alignItems: 'center',
	position: 'relative',
}
