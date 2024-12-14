import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal, styled, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EventForm } from '../shared/formConfigs/EventForm'
import { TaskForm } from '../shared/formConfigs/TaskForm'
import { GeneralForm } from '../shared/ui/formGenerator/GeneralForm'
import { submitTask } from './lib/submitForm'
import { submitEvent } from './lib/submitForm/submitFunctions'

export const TaskModalWindow = ({ open, handleClose }) => {
	const { control, handleSubmit } = useForm({ mode: 'onChange' })

	const [value, setValue] = useState(0)
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	// todo: разделить просто на форму
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<BlurredOverlay>
				<Box sx={style} display={'flex'} flexDirection={'column'}>
					<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							Create
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</Box>
					<Box>
						<Box>
							<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
								<Tab label='Task' />
								<Tab label='Event' />
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<GeneralForm config={TaskForm} submitFunction={submitTask} />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<GeneralForm config={EventForm} submitFunction={submitEvent} />
						</CustomTabPanel>
					</Box>
				</Box>
			</BlurredOverlay>
		</Modal>
	)
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
	display: 'flex',
	flexDirection: 'column',
}

const ButtonStyled = styled(Button)({
	marginTop: '1em',
	backgroundColor: '#187018',
	color: 'white',
})

const BlurredOverlay = styled(Box)({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	//backgroundColor: 'rgba(0, 0, 0, 0.5)',
	backdropFilter: 'blur(3px)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

//   const [value, setValue] = useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         Item One
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel>
//     </Box>

function CustomTabPanel({ children, value, index, ...other }) {
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
