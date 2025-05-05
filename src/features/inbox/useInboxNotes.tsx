import { Note } from '@/entities/Note'
import { useInboxStore } from '@/features/inbox/store'
import { createUserNote, deleteUserNote, editUserNote, getAllUserNotes } from '@/shared/api/notesRoutes'
import { DATE_TIME_FORMAT } from '@/shared/constants/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

export const useInboxNotes = () => {
	const { drafts, addDraft, removeDraft } = useInboxStore()
	const userId = localStorage.getItem('user_id') || ''
	const queryClient = useQueryClient()

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['inbox'],
		queryFn: getAllUserNotes,
		staleTime: 1000 * 60 * 2,
	})

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
		const { isDraft, id } = note
		isDraft && id ? removeDraft(id) : id ? deleteNote(id) : null
	}

	const handleSaveNote = (note: Note) => {
		const { isDraft, id, ...rest } = note
		if (isDraft) {
			removeDraft(id || '')
			saveNewNote({ ...rest, isDraft: false })
		} else saveOldNote(note)
	}

	const { mutateAsync: saveNewNote } = useMutation({
		mutationFn: createUserNote,
		onSuccess: createdNote => {
			queryClient.setQueryData(['inbox'], (prev: any[] = []) => [...prev, createdNote])
		},
	})

	const { mutateAsync: saveOldNote } = useMutation({
		mutationFn: editUserNote,
	})

	const { mutateAsync: deleteNote } = useMutation({
		mutationFn: deleteUserNote,
		onSuccess: () => refetch(),
	})

	return {
		userNotes: [...(data ?? []), ...drafts],
		isNotesFetching: isFetching,
		handleAddNewNote,
		handleSaveNote,
		saveNewNote,
		handleRemoveNote,
	}
}
