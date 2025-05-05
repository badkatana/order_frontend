export interface Note {
	id?: string
	userId: string
	text: string
	tag?: string
	isDone?: boolean
	dateCreated: string | null
	lastEdited: string | null
	projectId?: string
	isDraft?: boolean
}
