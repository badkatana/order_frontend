import { Dayjs } from 'dayjs'

export interface Task {
	id: number
	name: string
	description?: string
	hardDeadline?: string | Dayjs | undefined | null
	softDeadline?: string | Dayjs | undefined | null
	callendarDate: string | Dayjs | undefined | null
	status: boolean
	contextId?: number
	priority?: number
	userId: string
	links?: string[]
}
