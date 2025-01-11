import dayjs from 'dayjs'
import { InputCheckbox, InputDateTime, InputString, InputToggle } from '../ui/formGenerator/formItems'

export const EventForm = [
	{
		name: 'name',
		component: InputString,
	},
	// {
	// 	name: 'callendarDate',
	// 	component: InputDate,
	// 	required: true,
	// },
	{
		name: 'priority',
		component: InputToggle,
		groupItems: [
			{ value: 1, label: 'High' },
			{ value: 2, label: 'Middle' },
			{ value: 3, label: 'Low' },
		],
	},
	{
		name: 'periodStart',
		component: InputDateTime,
		defaultValue: dayjs(),
		maxDate: dayjs(),
		minDate: dayjs(),
		required: true,
	},
	{
		name: 'periodEnd',
		component: InputDateTime,
		maxDate: dayjs(),
		minDate: dayjs(),
		defaultValue: dayjs(),
		required: true,
	},
	{
		name: 'isPrivate',
		component: InputCheckbox,
	},
]
