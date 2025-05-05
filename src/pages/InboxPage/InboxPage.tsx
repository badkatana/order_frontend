import { ContainerPlaceholder, WithPageWrapper } from '@/shared/ui'
import { InboxItem } from '@/widgets/inbox/InboxItem'
import { Box, Button, styled } from '@mui/material'
import React from 'react'
import { useInboxNotes } from '../../features/inbox/useInboxNotes'

export const InboxPage: React.FC = () => {
	const { userNotes, isNotesFetching, handleAddNewNote } = useInboxNotes()

	if (isNotesFetching) return <ContainerPlaceholder progress />

	return (
		<WithPageWrapper>
			<Box sx={{ height: '85vh', justifyContent: 'center' }}>
				<ActionsArea>
					{/* <CategorySelector categories={sortByDate} onCategoryChange={} selectedCategory={} /> */}
					<Button
						variant='contained'
						color='primary'
						style={{ backgroundColor: '#989488' }}
						onClick={handleAddNewNote}
					>
						create a note
					</Button>
				</ActionsArea>
				<Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
					{userNotes?.length > 0 ? (
						userNotes.map(item => <InboxItem key={item.id} inboxNote={item} />)
					) : (
						<Box sx={{ height: '70vh' }}>
							<ContainerPlaceholder fullHeight />
						</Box>
					)}
				</Box>
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
