import { Note } from '@/entities/Note'
import { convertNote } from '@/features/inbox/convertNote'
import { useInboxNotes } from '@/features/inbox/useInboxNotes'
import { CustomIconButton } from '@/shared/buttons/CustomIconButton'
import { DATE_TIME_FORMAT } from '@/shared/constants/constants'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { ListItemActions } from '@/shared/ui/listItems/ListItemAction'
import { Box, Button, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

export const InboxItem = ({ inboxNote }: { inboxNote: Note }) => {
	const { isDraft, text, id } = inboxNote
	const [isEditable, setIsEditable] = useState(isDraft || false)
	const [newText, setNewText] = useState(text)
	const { handleSaveNote, handleRemoveNote } = useInboxNotes()
	const { handleConvertToTask } = convertNote()
	const [open, setOpen] = useState(false)

	const [config, setConfig] = useState({ config: [], submit: () => null })

	const InboxItemActions = () => {
		return (
			<>
				<CustomIconButton
					iconName={'convert'}
					onClick={() => {
						// @ts-ignore
						setConfig(handleConvertToTask(inboxNote))
						setOpen(true)
					}}
				/>
				<ListItemActions
					deleteAction={() => handleRemoveNote(inboxNote)}
					editAction={() => setIsEditable(!isEditable)}
					isEditable={isEditable}
					saveAction={() => {
						handleSaveNote({
							...inboxNote,
							text: newText,
							lastEdited: dayjs().format(DATE_TIME_FORMAT),
						})

						if (!String(id || '').includes('draft')) setIsEditable(false)
					}}
					cancelAction={() => setIsEditable(false)}
				/>
			</>
		)
	}

	return (
		<Box
			display={'flex'}
			width={'75%'}
			alignItems={'center'}
			sx={{
				border: isEditable ? '1px solid gray' : 'none',
				padding: '1em',
				borderRadius: '1em',
			}}
		>
			<Box display={'flex'} flexDirection={'column'} width={'100%'}>
				<TextField
					disabled={!isEditable}
					variant='standard'
					placeholder='write something'
					value={newText}
					fullWidth
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

				<Button />
			</Box>
			<InboxItemActions />
			<ModalBody open={open} handleClose={() => setOpen(false)} title={undefined}>
				<GeneralForm config={config.config} submitFunction={config.submit} />
			</ModalBody>
		</Box>
	)
}
