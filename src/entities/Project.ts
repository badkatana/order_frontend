import { Event } from './Event'
import { Note } from './Note'
import { Task } from './Task'

export interface Project {
	id: number
	status: boolean
	ownerId: string

	description?: string
	priority?: number
	contextId?: number
	hardDeadline?: string
	softDeadline?: string
	taskIds?: any[]
	links?: string[]
	tasks?: Task[]
	notes?: Note[]
	events?: Event[]
	projectUsers?: any[]
}
