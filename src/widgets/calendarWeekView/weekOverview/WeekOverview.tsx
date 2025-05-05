import { useAppStore } from '@/app'
import { CALENDAR_ITEM, DATE_FORMAT } from '@/shared/constants/constants'
import { AddCircleButton, ContainerPlaceholder, FileUploadButton } from '@/shared/ui'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import { uploadScheduleFromModeus } from '@/widgets/lib/submitForm'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UploadButton } from '../CalendarStyles'
import { WeekPicker } from './WeekPeeker'

export const WeekOverview = ({
	calendarItem,
	setOpen,
}: {
	calendarItem: CALENDAR_ITEM
	setOpen: (flag: boolean) => void
}) => {
	const { setSavedWeek, savedDate } = useAppStore()
	const { t } = useTranslation()

	return (
		<Box width={'25%'} display={'flex'} flexDirection={'column'} gap={'1em'}>
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
		</Box>
	)
}

const BoxContainerStyles = {
	borderRadius: '0.5em',
	borderColor: 'grey',
	border: '0.1em solid gray',
	display: 'flex',
	minHeight: '15em',
	flexDirection: 'column',
	alignItems: 'center',
}
