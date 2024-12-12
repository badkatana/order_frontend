import { InputString } from '../ui/formGenerator/formItems/InputString'
import { InputToggle } from '../ui/formGenerator/formItems/InputToggle'

export const AuthConfig = [
	{
		name: 'name',
		component: InputString,
		placeholder: 'Enter your name',
		required: true,
	},
	{
		name: 'password',
		component: InputString,
		type: 'password',
		required: true,
	},
	{
		name: 'email',
		component: InputString,
		required: true,
	},
	{
		name: 'type',
		component: InputToggle,
		groupItems: [
			{ value: 1, label: 'Register' },
			{ value: 2, label: 'Login' },
		],
	},
]
