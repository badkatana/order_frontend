import { TaskForm } from '@/shared/formConfigs'
import { submitTask } from '@/widgets/lib/submitForm'
import dayjs from 'dayjs'

export const convertNote = () => {
	const handleConvertToTask = note => {
		const defaultValues = {
			name: note.text,
			status: note.isDone,
			calendarDate: dayjs(),
		}
		const taskConfig = TaskForm

		const taskConfigWithDefaultValues = taskConfig.map(key => {
			if (defaultValues[key.name]) return { ...key, defaultValue: defaultValues[key.name] }
			else return key
		})

		return { config: taskConfigWithDefaultValues, submit: submitTask }
	}
	const handleConvertToEvent = () => {}
	const handleConvertToProject = () => {}

	return { handleConvertToTask, handleConvertToEvent, handleConvertToProject }
}
