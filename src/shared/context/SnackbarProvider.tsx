import { Alert, Snackbar } from '@mui/material'
import React, { createContext, ReactNode, useContext, useState } from 'react'

type SnackbarContextType = {
	callSnackbar: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info')

	const callSnackbar = (msg: string, sev: 'success' | 'error' | 'warning' | 'info' = 'info') => {
		setMessage(msg)
		setSeverity(sev)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<SnackbarContext.Provider value={{ callSnackbar }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleClose}
					severity={severity}
					icon={false}
					sx={{
						width: '80%',
						borderRadius: '16px',
						textAlign: 'center',
						boxShadow: 2,
					}}
				>
					{message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	)
}

export const useSnackbar = () => {
	const context = useContext(SnackbarContext)
	if (!context) {
		throw new Error('no snackbar context')
	}
	return context?.callSnackbar
}
