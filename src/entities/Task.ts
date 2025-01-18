import { Dayjs } from 'dayjs'

export interface Task {
	id: number
	name: string
	description?: string
	hardDeadline?: string | Dayjs | undefined | null
	softDeadline?: string | Dayjs | undefined | null
	calendarDate: string | Dayjs | undefined | null
	status: boolean
	contextId?: number
	priority?: number
	userId: string | null
	links?: string[]
	projectId?: number | string | null
}
