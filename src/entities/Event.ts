import { Dayjs } from 'dayjs'

export interface Event {
	id: number
	name: string
	status: boolean
	priority?: number
	periodStart?: string | Dayjs | null | undefined
	periodEnd: string | Dayjs | null | undefined
	type?: string
	isPrivate: boolean
	userId: string
	projectId?: string | null | number
}
