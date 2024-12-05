import { Context } from './Context'
import { Event } from './Event'
import { Task } from './Task'

export interface Calendar {
	tasks: Task[]
	events: Event[]
	context: Context[]
	userId: string
}
