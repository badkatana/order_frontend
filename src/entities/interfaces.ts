import { DefaultConfig } from '@/shared/constants/constants'
import { Dayjs } from 'dayjs'
import { Control } from 'react-hook-form'

export interface AuthContextType {
	isAuthenticated: boolean | undefined
	login: () => void
	logout: () => void
}

export interface TokenPayload {
	exp: number
}

export interface FormItem extends DefaultConfig {
	control: Control
	name: 'string'
	label?: 'string' | undefined | null
	maxDate?: Dayjs | string
	minDate?: Dayjs | string
	defaultValue?: any
	multiline?: boolean
	required?: boolean
}
