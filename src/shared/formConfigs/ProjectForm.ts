import { InputDate, InputString, InputToggle } from '../ui/formGenerator/formItems'

export const ProjectForm = [
	{
		name: 'description',
		label: 'Name',
		component: InputString,
		multiline: true,
		required: true,
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
]
