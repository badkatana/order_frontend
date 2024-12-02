export interface Event {
	id: number
	name: string
	status: boolean
	contextId?: number
	priority?: number
	calendarDate: string
	isPrivate: boolean
	userId: string
}
