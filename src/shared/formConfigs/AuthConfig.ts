import { DefaultConfig } from '../constants/constants'
import { addLabelToFormComponents } from '../lib/addLabelFormComponents'
import { InputString, InputToggle } from '../ui/formGenerator/formItems'

export const rawAuthConfig: DefaultConfig = [
	{
		name: 'type',
		component: InputToggle,
		groupItems: [
			{
				value: 1,
				label: 'Register',
				hidden: !import.meta.env.VITE_ALLOW_REGISTRATION,
			},
			{ value: 2, label: 'Login', hidden: !import.meta.env.VITE_ALLOW_REGISTRATION },
		],
	},
	{
		name: 'name',
		component: InputString,
		placeholder: 'Enter your name',
		required: true,
	},
	{
		name: 'email',
		component: InputString,
		required: true,
	},
	{
		name: 'password',
		component: InputString,
		type: 'password',
		required: true,
	},
]

export const AuthConfig = addLabelToFormComponents({ prefix: 'user.auth', config: rawAuthConfig })
