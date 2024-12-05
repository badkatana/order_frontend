export const TaskForm = {
	name: {
		component: 'string',
		multiline: true,
		required: true,
	},
	description: {
		component: 'string',
		multiline: true,
	},
	hardDeadline: {
		component: 'date',
	},
	softDeadline: {
		component: 'date',
	},
	context: {
		component: 'autocomplete',
	},
	priority: {
		component: 'autocomplete-row',
	},
	calendarDate: {
		component: 'date',
	},
	isPrivate: {
		component: 'checkbox',
	},
}
