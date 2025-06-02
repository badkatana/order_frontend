import { getAllUserNotes } from '@/shared/api/notesRoutes'
import { useQuery } from '@tanstack/react-query'
import { useInboxStore } from './store'

export const useInboxData = () => {
	const { drafts } = useInboxStore()
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['inbox'],
		queryFn: getAllUserNotes,
		staleTime: 1000 * 60 * 2,
	})

	return {
		refetch,
		userNotes: [...(data ?? []), ...drafts],
		isNotesFetching: isFetching,
	}
}
