import { Dayjs } from 'dayjs'
import { ComponentType } from 'react'

export const texts = [
	{ text: 'getting things done', direction: 'left', speed: 10 },
	{ text: '始末 始末 始末 始末 始末 始末 始末', direction: 'right', speed: 8 },
	{ text: 'a dolgok elintézése a dolgok elintézése', direction: 'left', speed: 12 },
	{ text: 'eine Sache erledigen', direction: 'right', speed: 15 },
	{ text: 'getting things done', direction: 'left', speed: 10 },
	{ text: '始末 始末 始末 始末 始末 始末 始末', direction: 'right', speed: 8 },
	{ text: 'a dolgok elintézése a dolgok elintézése', direction: 'left', speed: 12 },
	{ text: 'eine Sache erledigen', direction: 'right', speed: 15 },
]

export type DefaultObject = {
	[key: string]: any
}

export type DefaultObjectString = {
	[key: string]: string | undefined | null
}

export type DefaultConfig = {
	component: ComponentType<any>
	name: string
	groupItems?: { value: string | number; label: string | null }[]
	required?: boolean
	placeholder?: string
	type?: string
	defaultValue?: string | number | Dayjs
	maxDate?: Dayjs
	minDate?: Dayjs
	label?: string
	multiline?: boolean
}[]
