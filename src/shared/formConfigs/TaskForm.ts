import { addLabelToFormComponents } from '../lib/addLabelFormComponents'
import { InputDate, InputString, InputToggle } from '../ui/formGenerator/formItems'

const rawTaskForm = [
	{
		column: [
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
		],
	},
	{
		column: [
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
		],
	},
]

export const TaskForm = addLabelToFormComponents({ prefix: 'task.form', config: rawTaskForm })
