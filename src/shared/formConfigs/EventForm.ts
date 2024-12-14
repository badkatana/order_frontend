import dayjs from 'dayjs'
import { InputCheckbox } from '../ui/formGenerator/formItems/InputCheckbox'
import { InputDateTime } from '../ui/formGenerator/formItems/InputDateTime'
import { InputString } from '../ui/formGenerator/formItems/InputString'
import { InputToggle } from '../ui/formGenerator/formItems/InputToggle'

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
