export interface Event {
	id: number
	name: string
	status: boolean
	contextId?: number
	priority?: number
	calendarDate: string
	type?: string
	isPrivate: boolean
	userId: string
}
