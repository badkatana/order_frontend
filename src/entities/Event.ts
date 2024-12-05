export interface Event {
	id: number
	name: string
	status: boolean
	contextId?: number
	priority?: number
	periodStart: string
	periodEnd: string
	type?: string
	isPrivate: boolean
	taskIds: number[]
	userId: string
}
