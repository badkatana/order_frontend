import dayjs from 'dayjs'
import { InputDate } from '../ui/formGenerator/formItems/DatePicker'
import { InputCheckbox } from '../ui/formGenerator/formItems/InputCheckbox'
import { InputString } from '../ui/formGenerator/formItems/InputString'
import { InputToggle } from '../ui/formGenerator/formItems/InputToggle'

export const EventForm = [
	{
		name: 'name',
		component: InputString,
	},
	{
		name: 'callendarDate',
		component: InputDate,
		required: true,
	},
	// {
	// 	name: 'status',
	// 	component: InputString, // a нахуя нам это ????
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
		component: InputDate, // make input datetime
		minDate: dayjs(),
		required: true,
	},
	{
		name: 'periodEnd',
		component: InputDate, // make input datetime
		maxDate: dayjs(),
		required: true,
	},
	// {
	// 	name: 'type',
	// 	component: InputString, // мб это сделать вообще служебным полем
	// },
	{
		name: 'isPrivate',
		component: InputCheckbox, // input checkbox
	},
]
