import { Note } from '@/entities/Note'
import { createUserNote, deleteUserNote, editUserNote } from '@/shared/api/notesRoutes'
import { Box, Button, Card, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { ListItemActions } from '../listItems/ListItemAction'

export const UserNote = ({ note, setSortedNotes }: { note: Note; setSortedNotes: (data: number) => void }) => {
	const [isEditing, setIsEditing] = useState(note.id ? false : true)
	const [editedContent, setEditedContent] = useState(note.text)

	const handleSave = async () => {
		setIsEditing(false)
		note.id ? await editUserNote({ ...note, text: editedContent }) : await createUserNote({ text: editedContent })
	}
	return (
		<Card sx={{ padding: 2, marginBottom: 2, borderRadius: '0.5em' }}>
			<Box display={'flex'} flexDirection={'column'}>
				<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
					<Box marginBottom={'1em'} display='flex' flexDirection='column'>
						<Typography fontStyle={'italic'} color='grey'>{`created ${
							note.dateCreated?.split('T')[0]
						}`}</Typography>
						<Typography color='grey' fontStyle={'italic'}>{`last edited ${
							note.lastEdited?.split('T')[0]
						}`}</Typography>
					</Box>

					<Box>
						<ListItemActions
							editAction={() => setIsEditing(true)}
							deleteAction={async () => {
								note.id
									? deleteUserNote(note?.id)
									: setSortedNotes(prev => prev.filter(item => item.id !== note.id))
							}}
						/>
					</Box>
				</Box>
				{isEditing ? (
					<Box>
						<TextField
							fullWidth
							value={editedContent}
							onChange={e => setEditedContent(e.target.value)}
							multiline
							minRows={3}
							sx={{ marginBottom: 2 }}
						/>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button onClick={() => setIsEditing(false)}>Cancel</Button>
							<Button color='primary' onClick={handleSave}>
								Save
							</Button>
						</Box>
					</Box>
				) : (
					<Box sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
						<Typography>{editedContent}</Typography>
					</Box>
				)}
			</Box>
		</Card>
	)
}
