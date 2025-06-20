import { Task } from '@/entities/Task'
import { Dayjs } from 'dayjs'

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

export type DefaultDate = Dayjs | undefined | string | null

export type DefaultObjectString = {
	[key: string]: string | undefined | null
}

export type DefaultConfig = {
	name?: string
	component: any
	groupItems?: { value: string | number; label: string | null; hidden?: boolean }[]
	required?: boolean
	placeholder?: string
	type?: string
	defaultValue?: string | number | Dayjs | any
	maxDate?: Dayjs
	minDate?: Dayjs
	label?: string
	multiline?: boolean
	column?: Record<string, any>[]
	isFullRow?: boolean
}[]

export const DATE_FORMAT = 'YYYY-MM-DD'
export const RU_DATE_FORMAT = 'DD.MM.YYYY'
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm'
export type CALENDAR_ITEM = { [key: string]: { tasks: Task[] | []; events: Event[] | [] } }

export const categories = {
	economy: ['экономика', 'финансы', 'цифровая экономика', 'бизнес', 'майнинг'],
	IT: ['IT', 'технологии', 'цифровизация', 'инжиниринг', 'компьютерный'],
	social: [
		'социология',
		'общество',
		'воспитание',
		'социализация',
		'образование',
		'гражданский',
		'социализм',
		'регион',
	],
	culture: ['культура', 'искусство', 'история', 'музыка', 'театр', 'литература'],
	ecology: ['экология', 'климат', 'природа', 'зеленые технологии'],
	science: ['наука', 'исследования', 'развитие', 'технология', 'инновации'],
}

export const sortByDate = ['created', 'last edited']

export type WEEK_DIRECTION = 'previous' | 'next'

export const SCROLLBAR = {
	'&::-webkit-scrollbar': {
		width: '8px',
	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: 'transparent',
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: '#c1c1c1',
		borderRadius: '8px',
		border: '2px solid transparent',
		backgroundClip: 'padding-box',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: '#a0a0a0',
	},
}

export type CustomTabsType = {
	label: string
	content: any
	icon?: string
}
