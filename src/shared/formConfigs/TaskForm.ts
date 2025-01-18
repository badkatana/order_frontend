import { DefaultConfig } from '../constants/constants'
import { InputDate, InputString, InputToggle } from '../ui/formGenerator/formItems'

export const TaskForm: DefaultConfig = [
	{
		name: 'name',
		label: 'Name',
		component: InputString,
		multiline: true,
		required: true,
	},
	{
		name: 'description',
		component: InputString,
		multiline: true,
	},
	{
		name: 'priority',
		label: 'Priority',
		component: InputToggle,
		groupItems: [
			{ value: 1, label: 'High' },
			{ value: 2, label: 'Middle' },
			{ value: 3, label: 'Low' },
		],
	},
	{
		name: 'calendarDate',
		label: 'Calendar Date',
		component: InputDate,
	},
	{
		name: 'hardDeadline',
		label: 'Hard Deadline',
		component: InputDate,
	},
	{
		name: 'softDeadline',
		label: 'Soft Deadline',
		component: InputDate,
	},
]
