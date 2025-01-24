import { Note } from '@/entities/Note'
import { getAllUserNotes } from '@/shared/api/notesRoutes'
import { sortByDate } from '@/shared/constants/constants'
import { ContainerPlaceholder, WithPageWrapper } from '@/shared/ui'
import { CategorySelector } from '@/shared/ui/CategorySelector/CategorySelector'
import { UserNote } from '@/shared/ui/UserNote/UserNote'
import { Box, Button, styled } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

export const InboxPage: React.FC = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['inbox'],
		queryFn: () => getAllUserNotes(),
		staleTime: 1000 * 60 * 2,
	})

	const [sortedNotes, setSortedNotes] = useState(data?.$values ?? [])
	const [selectedSort, setSelectedSort] = useState(sortByDate[0])
	const columnsCount = 3

	const handleSort = (sortField: keyof (typeof data)['$values'][number]) => {
		if (data?.$values && Array.isArray(data.$values) && !isFetching) {
			const updatedNotes = [...data.$values].sort((a, b) => {
				if (a[sortField] > b[sortField]) return -1
				if (a[sortField] < b[sortField]) return 1
				return 0
			})

			setSortedNotes(updatedNotes)
		} else {
			console.warn('Sorting skipped due to invalid data or fetching state')
		}

		return []
	}

	useEffect(() => {
		if (selectedSort === sortByDate[0]) {
			handleSort('dateCreated')
		} else handleSort('lastEdited')
	}, [selectedSort, data])

	const columns: JSX.Element[][] = Array(columnsCount)
		.fill([])
		.map(() => [])

	sortedNotes?.forEach((note: Note, index: number) => {
		const columnIndex = index % columnsCount
		columns[columnIndex].push(
			<UserNote note={note} key={`notes_item_${note.id}`} setSortedNotes={setSortedNotes} />
		)
	})

	const handleCreateANote = () => {
		const newNote: Note = {
			dateCreated: dayjs().format('YYYY-MM-DD'),
			lastEdited: dayjs().format('YYYY-MM-DD'),
			text: '',
			saved: true,
		}

		setSortedNotes((prev: Note[]) => [newNote, ...prev])
	}

	if (isFetching) return <ContainerPlaceholder progress />

	return (
		<WithPageWrapper>
			<Box sx={{ height: '85vh', justifyContent: 'center' }}>
				<ActionsArea>
					<CategorySelector
						categories={sortByDate}
						onCategoryChange={value => setSelectedSort(value)}
						selectedCategory={selectedSort}
					/>
					<Button
						variant='contained'
						color='primary'
						style={{ backgroundColor: '#989488' }}
						onClick={handleCreateANote}
					>
						create a note
					</Button>
				</ActionsArea>
				{sortedNotes?.length > 0 ? (
					<Box sx={{ padding: 2, display: 'flex', height: '70vh', justifyContent: 'center' }}>
						<Box sx={{ display: 'flex', gap: 2, overflowX: 'hidden', overflowY: 'auto', width: '90%' }}>
							{columns.map((column, idx) => (
								<Box key={`notes_${idx}`} sx={{ flex: 1, width: '30%' }}>
									{column}
								</Box>
							))}
						</Box>
					</Box>
				) : (
					<Box sx={{ height: '70vh' }}>
						<ContainerPlaceholder fullHeight />
					</Box>
				)}
			</Box>
		</WithPageWrapper>
	)
}

export const ActionsArea = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	width: '98%',
	alignItems: 'flex-end',
	paddingBottom: '1em',
	paddingTop: '0.5em',
	justifyContent: 'flex-end',
	gap: '1em',
})
