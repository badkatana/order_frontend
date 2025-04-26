import { useAppStore } from '@/app'
import { getCalendar } from '@/shared/api'
import { DATE_FORMAT } from '@/shared/constants/constants'
import { AddCircleButton, ContainerPlaceholder, FileUploadButton } from '@/shared/ui'
import { DayWeek } from '@/shared/ui/calenders/day/DayWeek'
import { ListItemTask } from '@/shared/ui/listItems/ListItemTask'
import WeekPicker from '@/shared/ui/WeekPeeker'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import { generateDateRange, groupArraysByDate } from '../lib'
import { uploadScheduleFromModeus } from '../lib/submitForm'
import { CreateTaskEventModalWindow } from '../modals'
import { UploadButton } from './CalendarStyles'

export const CalendarWeek = () => {
	const { savedWeek, setSavedWeek, savedDate } = useAppStore()
	const dateRange = generateDateRange(savedWeek.monday, savedWeek.sunday)
	const [open, setOpen] = useState(false)

	const { data, isFetching } = useQuery({
		queryKey: ['calendar', savedWeek],
		queryFn: () =>
			getCalendar({
				dateStart: (savedWeek?.monday as Dayjs).format('YYYY-MM-DD').toString(),
				dateEnd: (savedWeek?.sunday as Dayjs).format('YYYY-MM-DD').toString(),
			}),
	})

	const calendarItem = !isFetching && groupArraysByDate(data, dateRange)

	console.log(calendarItem)
	return (
		<Box
			sx={{
				marginTop: '1em',
				minWidth: '100%',
				minHeight: '100%',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<Box width={'25%'} display={'flex'} flexDirection={'column'} gap={'1em'}>
				<WeekPicker onChange={(monday, sunday) => setSavedWeek({ monday, sunday })} />
				<FileUploadButton
					onUpload={uploadScheduleFromModeus}
					buttonText='Upload Schedule'
					accept='.ics'
					buttonStyle={UploadButton}
				/>
				<Box
					sx={{
						borderRadius: '0.5em',
						borderColor: 'grey',
						border: '0.1em solid gray',
						display: 'flex',
						minHeight: '15em',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography>Tasks</Typography>
					{calendarItem[savedDate.format(DATE_FORMAT)]?.tasks.length === 0 && (
						<ContainerPlaceholder fullHeight />
					)}
					{calendarItem[savedDate.format(DATE_FORMAT)]?.tasks.map((task, index) => (
						<ListItemTask key={`${task.name}_${index}_${savedDate.format(DATE_FORMAT)}`} task={task} />
					))}
					<AddCircleButton
						iconSize='small'
						onClick={_ => {
							setOpen(!open)
						}}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					background: 'linear-gradient(to right, #e6f970, #cbe2ec)',
					width: '70%',
					borderRadius: '2em',
					padding: '1em',
					height: '85vh',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
				}}
			>
				<Box
					sx={{
						flex: 1,
						overflowY: 'auto',
						display: 'flex',
						flexDirection: 'row',
						borderRadius: '1em',
						/* Красивый скроллбар */
						'&::-webkit-scrollbar': {
							width: '8px',
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: 'transparent',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#c1c1c1',
							borderRadius: '8px',
							border: '2px solid transparent',
							backgroundClip: 'padding-box',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							backgroundColor: '#a0a0a0',
						},
					}}
				>
					<DayWeek isTimeColumn />
					{dateRange.map(date => (
						<DayWeek key={date} date={date} events={calendarItem[date]?.events} />
					))}
				</Box>

				<CreateTaskEventModalWindow open={open} handleClose={() => setOpen(!open)} />
			</Box>
		</Box>
	)
}

// ;<CalendarWrapper>
// 	{!isFetching ? (
// 		dateRange.map(date => {
// 			return (
// 				<BaseDayCalendar
// 					/*  @ts-ignore */
// 					tasks={calendarItem[date] ? calendarItem[date].tasks : []}
// 					/*  @ts-ignore */
// 					events={calendarItem[date] ? calendarItem[date].events : []}
// 					key={date}
// 					date={date}
// 				/>
// 			)
// 		})
// 	) : (
// 		<ContainerPlaceholder fullHeight progress />
// 	)}
// </CalendarWrapper>
