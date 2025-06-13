import { TaskForm } from '@/shared/formConfigs'
import { addDefaultValuesInConfig } from '@/shared/lib/addLabelFormComponents'
import { submitTask } from '@/widgets/lib/submitForm'
import dayjs from 'dayjs'

export const convertNote = () => {
	// @ts-ignore
	const handleConvertToTask = note => {
		const defaultValues = {
			name: note.text,
			status: note.isDone,
			calendarDate: dayjs(),
		}
		const taskConfig = TaskForm

		const taskConfigWithDefaultValues = addDefaultValuesInConfig({ config: taskConfig, defaultValues })

		return { config: taskConfigWithDefaultValues, submit: submitTask }
	}
	const handleConvertToEvent = () => {}
	const handleConvertToProject = () => {}

	return { handleConvertToTask, handleConvertToEvent, handleConvertToProject }
}
