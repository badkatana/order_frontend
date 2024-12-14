import { InputDate } from '../ui/formGenerator/formItems/DatePicker'
import { InputString } from '../ui/formGenerator/formItems/InputString'
import { InputToggle } from '../ui/formGenerator/formItems/InputToggle'

export const TaskForm = [
	{
		name: 'Name',
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
		title: 'Priority',
		component: InputToggle,
		groupItems: [
			{ value: 1, label: 'High' },
			{ value: 2, label: 'Middle' },
			{ value: 3, label: 'Low' },
		],
	},
	{
		name: 'callendarDate',
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
	// context: {
	// 	component: 'autocomplete',
	// },
]
