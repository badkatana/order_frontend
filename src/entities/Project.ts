import { Event } from './Event'
import { Task } from './Task'

export interface Project {
	id: number
	description?: string
	priority?: number
	contextId?: number
	hardDeadline?: string
	softDeadline?: string
	userId: string
	taskIds?: any[]
	status: boolean
	links?: string[]
	tasks?: { $values: Task[] | null }
	events?: { $values: Event[] | null }
}
