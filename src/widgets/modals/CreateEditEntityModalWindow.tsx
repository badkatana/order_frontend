import { Project } from '@/entities/Project'
import { Task } from '@/entities/Task'
import { DefaultConfig } from '@/shared/constants/constants'
import { EventForm, ProjectForm, TaskForm } from '@/shared/formConfigs'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { useEffect, useState } from 'react'

type CreateEditEntityModalWindow = {
	editEntityItem?: Task | Event | Project
	defaultDate?: string
	open: boolean
	handleClose: () => void
	method?: 'edit' | 'create'
	type: 'Task' | 'Event' | 'Project'
	submit: any
}

export const CreateEditEntityModalWindow = ({
	editEntityItem,
	defaultDate,
	type,
	handleClose,
	open,
	submit,
	method,
}: CreateEditEntityModalWindow) => {
	const [entityConfig, setEntityConfig] = useState<DefaultConfig>(
		type === 'Task' ? TaskForm : type === 'Event' ? EventForm : ProjectForm
	)

	useEffect(() => {
		if (!editEntityItem) return
		const editEntityConfig: DefaultConfig = entityConfig?.map(item => {
			if (typeof item === 'object' && item !== null) {
				return {
					...item,
					// @ts-ignore
					defaultValue: editEntityItem[item.name],
				}
			} else {
				return item
			}
		})

		setEntityConfig(editEntityConfig)
	}, [editEntityItem])

	if (defaultDate && (type === 'Task' || type === 'Event')) {
		const configWithDate = getRightDefaultValues(entityConfig, type, defaultDate)
		setEntityConfig(configWithDate)
	}

	return (
		<ModalBody open={open} handleClose={handleClose} title={`${method ?? 'create'} ${type}`}>
			<GeneralForm config={entityConfig} submitFunction={submit} />
		</ModalBody>
	)
}

function getRightDefaultValues(config: any[], type: 'Task' | 'Event', defaultDate: string) {
	const setDefaultDate = (fieldName: string) => {
		config.find(item => item.name === fieldName).defaultValue = defaultDate
	}

	switch (type) {
		case 'Task': {
			setDefaultDate('calendarDate')
			break
		}
		case 'Event': {
			setDefaultDate('periodStart')
			setDefaultDate('periodEnd')
			break
		}
	}

	return config
}
