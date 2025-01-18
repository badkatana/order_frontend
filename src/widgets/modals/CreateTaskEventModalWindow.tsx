import { TaskForm } from '@/shared/formConfigs'
import { EventForm } from '@/shared/formConfigs/EventForm'
import { ModalBody } from '@/shared/ui'
import { GeneralForm } from '@/shared/ui/formGenerator/GeneralForm'
import { Box, Tab, Tabs } from '@mui/material'
import { ReactElement, useState } from 'react'
import { submitTask } from '../lib/submitForm'
import { submitEvent } from '../lib/submitForm/submitFunctions'

export const CreateTaskEventModalWindow = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
	const [value, setValue] = useState(0)

	return (
		<ModalBody open={open} handleClose={handleClose} title={'Create'}>
			<Box>
				<Box>
					<Tabs value={value}>
						<Tab label='Task' onClick={() => setValue(0)} />
						<Tab label='Event' onClick={() => setValue(1)} />
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<GeneralForm config={TaskForm} submitFunction={submitTask} />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<GeneralForm config={EventForm} submitFunction={submitEvent} />
				</CustomTabPanel>
			</Box>
		</ModalBody>
	)
}

function CustomTabPanel({
	children,
	value,
	index,
	...other
}: {
	children: ReactElement
	value: number | null
	index: number
}) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}
