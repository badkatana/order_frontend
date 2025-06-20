import { Note } from '@/entities/Note'
import { TaskForm } from '@/shared/formConfigs'
import { addDefaultValuesInConfig } from '@/shared/lib'
import { submitTask } from '@/widgets/lib/submitForm'
import dayjs from 'dayjs'

export const convertNote = () => {
	const handleConvertToTask = (note: Note) => {
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
