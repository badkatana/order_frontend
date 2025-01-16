import { DefaultConfig } from '../constants/constants'
import { InputString, InputToggle } from '../ui/formGenerator/formItems'

export const AuthConfig: DefaultConfig = [
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
