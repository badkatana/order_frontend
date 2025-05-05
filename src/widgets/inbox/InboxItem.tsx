import { Note } from '@/entities/Note'
import { useInboxNotes } from '@/features/inbox/useInboxNotes'
import { deleteUserNote } from '@/shared/api/notesRoutes'
import { DATE_TIME_FORMAT } from '@/shared/constants/constants'
import { ListItemActions } from '@/shared/ui/listItems/ListItemAction'
import { Box, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

export const InboxItem = ({ inboxNote }: { inboxNote: Note }) => {
	const [isEditable, setIsEditable] = useState(inboxNote.isDraft)
	const [newText, setNewText] = useState(inboxNote.text)
	const { handleSaveNote } = useInboxNotes()

	return (
		<Box display={'flex'} width={'70%'} alignItems={'center'}>
			{/** here is text */}
			<TextField
				disabled={!isEditable}
				variant='standard'
				value={newText}
				sx={{
					border: 'none',
				}}
				onChange={e => {
					setNewText(e.target.value)
				}}
				slotProps={{
					input: {
						disableUnderline: !isEditable,
					},
				}}
			/>

			<ListItemActions
				deleteAction={() => deleteUserNote(inboxNote.id || '')}
				editAction={() => setIsEditable(!isEditable)}
				isEditable={isEditable}
				saveAction={() => {
					console.log('click')
					handleSaveNote({
						...inboxNote,
						text: newText,
						lastEdited: dayjs().format(DATE_TIME_FORMAT),
					})
				}}
				cancelAction={() => setIsEditable(false)}
			/>
		</Box>
	)
}
