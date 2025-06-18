import { getRecommendations } from '@/shared/api/taskRoutes'
import { RU_DATE_FORMAT } from '@/shared/constants/constants'
import { ContainerPlaceholder, ModalBody } from '@/shared/ui'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DownloadIcon from '@mui/icons-material/Download'
import {
	Box,
	Button,
	DialogContent,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { t } from 'i18next'
import React from 'react'

interface TaskActivityModalProps {
	open: boolean
	onClose: () => void
}

export const TaskActivityModal: React.FC<TaskActivityModalProps> = ({ open, onClose }) => {
	const { data, isFetching } = useQuery({ queryKey: [''], queryFn: getRecommendations, refetchInterval: Infinity })

	if (isFetching) return <ContainerPlaceholder fullHeight progress />

	// Группировка ID по дате
	const groupedByDate: Record<string, string[]> = {}
	Object.entries(data.datesForTaskIds).forEach(([taskId, date]) => {
		if (!groupedByDate[date]) groupedByDate[date] = []
		groupedByDate[date].push(taskId)
	})

	return (
		<ModalBody
			open={open}
			handleClose={onClose}
			title={t('stats.activityModal.title')}
			sx={{ fullWidth: true, maxWidth: 'md', color: 'white' }}
		>
			<DialogContent dividers>
				<Typography sx={{ width: '100%' }}>{t('stats.activityModal.avgTooltip')}</Typography>
				<Box mt={2} display='flex' gap={4} alignItems='center'>
					<Box display='flex' alignItems='center' gap={1}>
						<AccessTimeIcon color='action' />
						<Typography variant='body2'>
							Среднее кол-во дней: {data.avgCompletionTime?.days || 1}
						</Typography>
					</Box>
					<Box display='flex' alignItems='center' gap={1}>
						<AccessTimeIcon color='action' />
						<Typography variant='body2'>
							Среднее кол-во часов: {data.avgCompletionTime?.hours || `3`}
						</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 3 }} />

				<Typography variant='h6' gutterBottom>
					📅 {t('stats.activityModal.recommendToStart')}
				</Typography>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell>
								<strong>Дата</strong>
							</TableCell>
							<TableCell>
								<strong>Задачи</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.entries(groupedByDate)
							.sort()
							.map(([date, ids]) => {
								const taskNames = Object.entries(data.taskNames)
									.filter(([id]) => ids.includes(id))
									.map(([, name]) => name)

								return (
									<TableRow key={date}>
										<TableCell>{dayjs(date).format(RU_DATE_FORMAT).toString()}</TableCell>
										<TableCell>{taskNames.join(', ')}</TableCell>
									</TableRow>
								)
							})}
					</TableBody>
				</Table>

				<Box display='flex' justifyContent='flex-end' gap={2} mt={4}>
					<Button variant='outlined' startIcon={<DownloadIcon />} onClick={() => alert('TODO: Export')}>
						Экспорт в CSV
					</Button>
				</Box>
			</DialogContent>
		</ModalBody>
	)
}
