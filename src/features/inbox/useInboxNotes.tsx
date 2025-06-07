import { Note } from '@/entities/Note'
import { createUserNote, deleteUserNote, editUserNote } from '@/shared/api/notesRoutes'
import { DATE_TIME_FORMAT } from '@/shared/constants/constants'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useInboxStore } from './store'

export const useInboxNotes = ({ refetch = undefined }) => {
	const userId = localStorage.getItem('user_id') || ''
	const { addDraft, removeDraft } = useInboxStore()

	const handleAddNewNote = () => {
		const newNote: Note = {
			id: `draft-${Date.now()}`,
			userId,
			text: 'here the problem',
			isDraft: true,
			isDone: false,
			tag: 'inbox',
			lastEdited: dayjs().format(DATE_TIME_FORMAT),
			dateCreated: dayjs().format(DATE_TIME_FORMAT),
		}

		addDraft(newNote)
	}

	const handleRemoveNote = (note: Note) => {
		const { isDraft, noteId } = note
		isDraft && noteId ? removeDraft(noteId) : noteId ? deleteNote(noteId) : null
	}

	const handleSaveNote = (note: Note) => {
		const { isDraft, noteId, ...rest } = note
		if (isDraft) {
			removeDraft(noteId || '')
			saveNewNote({ ...rest, isDraft: false })
		} else editUserNote(note)
	}

	const { mutateAsync: saveNewNote } = useMutation({
		mutationFn: createUserNote,
		onSuccess: createdNote => {
			refetch?.()
		},
	})

	const { mutateAsync: deleteNote } = useMutation({
		mutationFn: deleteUserNote,
		onSuccess: () => refetch?.(),
	})

	return {
		handleAddNewNote,
		handleSaveNote,
		saveNewNote,
		handleRemoveNote,
	}
}
