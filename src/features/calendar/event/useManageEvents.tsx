import { Event } from '@/entities/Event'
import { deleteEvent } from '@/shared/api/eventsRoutes'
import { CustomContextMenu } from '@/shared/ui'
import { submitEditedEvent, submitEvent } from '@/widgets/lib/submitForm/submitFunctions'
import { CreateEditEntityModalWindow } from '@/widgets/modals'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

export const useManageEvents = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [openEventModal, setOpenEventModal] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>()
	const queryClient = useQueryClient()
	const refetch = () => queryClient.refetchQueries({ queryKey: ['calendar'], exact: false })
	const openContextMenu = Boolean(anchorEl)

	const { mutateAsync: deleteAsync } = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			handleClose()
			refetch()
		},
	})

	const options = [
		{
			key: 'create-event',
			label: !selectedEvent ? 'actions.create' : 'actions.edit',
			onClick: () => setOpenEventModal(true),
		},
		{
			key: 'delete-event',
			skip: !selectedEvent,
			label: 'actions.delete',
			onClick: () => deleteAsync(selectedEvent.eventId),
		},
	]

	const handleOpenContextMenu = (e, date = undefined, event = undefined) => {
		e.preventDefault()
		setAnchorEl(e.currentTarget)
		console.log('date', date)
		if (date) setSelectedDate(date)
		if (event) setSelectedEvent(event)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const EventContextMenuModal = (
		<CustomContextMenu open={openContextMenu} anchorEl={anchorEl} handleClose={handleClose} options={options} />
	)

	const handleSubmitEvent = values => {
		if (selectedEvent) submitEditedEvent(values, selectedEvent, queryClient)
		else submitEvent(values)
		refetch()
	}

	const EventCreateEditModal = (
		<CreateEditEntityModalWindow
			type={'Event'}
			editEntityItem={selectedEvent}
			open={openEventModal}
			defaultDate={selectedDate}
			handleClose={() => {
				setOpenEventModal(false)
				setSelectedEvent(undefined)
				setSelectedDate(null)
			}}
			submit={values => handleSubmitEvent(values)}
		/>
	)

	return { handleOpenContextMenu, EventContextMenuModal, EventCreateEditModal }
}
