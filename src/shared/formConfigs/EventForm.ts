import dayjs from 'dayjs'
import { DefaultConfig } from '../constants/constants'
import { addLabelToFormComponents } from '../lib/addLabelFormComponents'
import { InputDateTime, InputString, InputToggle } from '../ui/formGenerator/formItems'

const rawEventForm = [
	{
		column: [
			{
				name: 'name',
				component: InputString,
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
		],
	},
	{
		column: [
			{
				name: 'periodStart',
				component: InputDateTime,
				label: 'From time: ',
				defaultValue: dayjs(),
				// maxDate: dayjs(),
				// minDate: dayjs(),
				required: true,
			},
			{
				name: 'periodEnd',
				label: 'To Time: ',
				component: InputDateTime,
				// maxDate: dayjs(),
				// minDate: dayjs(),
				defaultValue: dayjs(),
				required: true,
			},
		],
	},
]

export const EventForm: DefaultConfig = addLabelToFormComponents({ prefix: 'event.form', config: rawEventForm })
