import { Note } from '@/entities/Note'
import { create } from 'zustand'

interface InboxStore {
	drafts: Note[]
	addDraft: (note: Note) => void
	removeDraft: (id: string) => void
}

export const useInboxStore = create<InboxStore>(set => ({
	drafts: [],
	addDraft: note => set(state => ({ drafts: [...state.drafts, note] })),
	removeDraft: id => set(state => ({ drafts: state.drafts.filter(d => d.id !== id) })),
}))
