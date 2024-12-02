export interface Task {
	id: number
	name: string
	description?: string
	hardDeadline?: string
	softDeadline?: string
	status: boolean
	contextId?: number
	priority?: number
	userId: string
	eventId?: number
	calendarDate?: string
	isPrivate?: string
}
