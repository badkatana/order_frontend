import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { DefaultConfig, DefaultObjectString } from '@/shared/constants/constants'
import { EventForm, ProjectForm, TaskForm } from '@/shared/formConfigs'
import { addDefaultValuesInConfig } from '@/shared/lib'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { Box } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

type CreateEditEntityModalWindow = {
	editEntityItem?: Task | Event | Project | Record<string, any>
	defaultDate?: string | Dayjs | null | undefined
	open: boolean
	handleClose: () => void
	method?: 'edit' | 'create'
	type: 'Task' | 'Event' | 'Project'
	submit: any
	sx?: DefaultObjectString
}

export const CreateEditEntityModalWindow = ({
	editEntityItem,
	type,
	handleClose,
	open,
	submit,
	defaultDate = undefined,
	sx = {},
}: CreateEditEntityModalWindow) => {
	const [entityConfig, setEntityConfig] = useState<DefaultConfig>(
		type === 'Task' ? TaskForm : type === 'Event' ? EventForm : ProjectForm
	)

	useEffect(() => {
		if (type === 'Event' && !editEntityItem && defaultDate) {
			const editEntityConfig: DefaultConfig = addDefaultValuesInConfig({
				config: entityConfig,
				defaultValues: { periodStart: defaultDate, periodEnd: dayjs(defaultDate) },
			})
			setEntityConfig(editEntityConfig)
			return
		}

		if (!editEntityItem) return

		const editEntityConfig: DefaultConfig = addDefaultValuesInConfig({
			config: entityConfig,
			defaultValues: editEntityItem,
		})

		setEntityConfig(editEntityConfig)
	}, [editEntityItem, type, defaultDate])

	return (
		<ModalBody
			open={open}
			handleClose={handleClose}
			title={t(`actions.${editEntityItem ? 'edit' : 'create'}`)}
			sx={{ maxWidth: '50em', ...sx }}
		>
			<Box display={'flex'} justifyContent={'space-evenly'}>
				<GeneralForm config={entityConfig} submitFunction={submit} />
			</Box>
		</ModalBody>
	)
}
