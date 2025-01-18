import dayjs from 'dayjs'
import { DefaultConfig } from '../constants/constants'
import { InputCheckbox, InputDateTime, InputString, InputToggle } from '../ui/formGenerator/formItems'

export const EventForm: DefaultConfig = [
	{
		name: 'name',
		component: InputString,
	},
	{
		name: 'periodStart',
		component: InputDateTime,
		label: 'From time: ',
		defaultValue: dayjs(),
		maxDate: dayjs(),
		minDate: dayjs(),
		required: true,
	},
	{
		name: 'periodEnd',
		label: 'To Time: ',
		component: InputDateTime,
		maxDate: dayjs(),
		minDate: dayjs(),
		defaultValue: dayjs(),
		required: true,
	},

	{
		name: 'priority',
		component: InputToggle,
		label: 'priority',
		groupItems: [
			{ value: 1, label: 'High' },
			{ value: 2, label: 'Middle' },
			{ value: 3, label: 'Low' },
		],
	},
	{
		name: 'isPrivate',
		label: 'Can other users see this event?',
		component: InputCheckbox,
	},
]
