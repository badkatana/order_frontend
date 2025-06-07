import { useAppStore } from '@/app'
import { SCROLLBAR } from '@/shared/constants/constants'
import { theme } from '@/shared/ui/theme'
import { InboxItem } from '@/widgets/inbox/InboxItem'
import { Box, Button, List, Typography } from '@mui/material'
import { useState } from 'react'

export const ProjectItemNotes = ({ notes }) => {
	const { selectedProject } = useAppStore()
	const { projectId } = selectedProject
	const userId = localStorage.getItem('user_id')
	const draftNote = { projectId, isDraft: true, noteId: 'draft-project', userId }
	const [projectNotes, setProjectNotes] = useState(notes)

	return (
		<Box
			elevation={2}
			sx={{
				p: 2,
				borderRadius: 2,
				maxHeight: '70vh',
				...SCROLLBAR,
				overflowY: 'scroll',
				backgroundColor: theme.palette.background,
			}}
		>
			<Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
				<Button variant='contained' size='small' onClick={() => setProjectNotes(prev => [...prev, draftNote])}>
					Добавить заметку
				</Button>
			</Box>

			<List disablePadding>
				{projectNotes.length > 0 ? (
					projectNotes.map((note, index) => <InboxItem key={index} inboxNote={note} />)
				) : (
					<Typography variant='body2' color='text.secondary'>
						Пока нет заметок
					</Typography>
				)}
			</List>
		</Box>
	)
}
