export interface Project {
	id: number
	description?: string
	priority?: number
	contextId?: number
	hardDeadline?: string
	softDeadline?: string
	userId: number
	status: boolean
}
