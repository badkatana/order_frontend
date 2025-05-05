import { Note } from '@/entities/Note'
import { useInboxStore } from '@/features/inbox/store'
import { createUserNote, getAllUserNotes } from '@/shared/api/notesRoutes'
import { DATE_TIME_FORMAT } from '@/shared/constants/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

export const useInboxNotes = () => {
	const { drafts, addDraft, removeDraft } = useInboxStore()
	const userId = localStorage.getItem('user_id') || ''
	const queryClient = useQueryClient()

	const { data, isFetching } = useQuery({
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
		/// todo remove
	}

	const handleEditNote = (note: Note) => {
		// todo edit note
	}

	const handleSaveNote = (note: Note) => {
		const { isDraft, id, ...rest } = note
		if (isDraft) {
			removeDraft(id || '')
			saveNewNote({ ...rest, isDraft: false })
		}
	}

	const { mutateAsync: saveNewNote } = useMutation({
		mutationFn: createUserNote,
		onSuccess: createdNote => {
			queryClient.setQueryData(['inbox'], (prev: any[] = []) => [...prev, createdNote])
		},
	})

	return {
		userNotes: [...(data ?? []), ...drafts],
		isNotesFetching: isFetching,
		handleAddNewNote,
		handleSaveNote,
		saveNewNote,
		handleEditNote,
		handleRemoveNote,
	}
}
