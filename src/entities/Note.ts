export interface Note {
	dateCreated: string | null
	lastEdited: string | null
	text: string | null
	saved?: boolean
	id?: string
}
