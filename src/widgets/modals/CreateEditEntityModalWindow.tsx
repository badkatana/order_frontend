import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { DefaultConfig, DefaultObjectString } from '@/shared/constants/constants'
import { EventForm, ProjectForm, TaskForm } from '@/shared/formConfigs'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { Box } from '@mui/material'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

type CreateEditEntityModalWindow = {
	editEntityItem?: Task | Event | Project | Record<string, any>
	defaultDate?: string
	open: boolean
	handleClose: () => void
	method?: 'edit' | 'create'
	type: 'Task' | 'Event' | 'Project'
	submit: any
	sx: DefaultObjectString
}

export const CreateEditEntityModalWindow = ({
	editEntityItem,
	type,
	handleClose,
	open,
	submit,
	sx = {},
}: CreateEditEntityModalWindow) => {
	const [entityConfig, setEntityConfig] = useState<DefaultConfig>(
		type === 'Task' ? TaskForm : type === 'Event' ? EventForm : ProjectForm
	)

	useEffect(() => {
		if (!editEntityItem) return
		const editEntityConfig: DefaultConfig = entityConfig?.map(item => {
			const addDefaultValue = (formField: any) => ({
				...formField,
				defaultValue: editEntityItem?.[formField.name] ?? '',
			})

			if (item && typeof item === 'object') {
				if ('column' in item) {
					return {
						...item,
						column: item.column.map(addDefaultValue),
					}
				}
				return addDefaultValue(item)
			}

			return item
		})

		setEntityConfig(editEntityConfig)
	}, [editEntityItem])

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
