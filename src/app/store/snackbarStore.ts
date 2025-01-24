import { create } from 'zustand'

type SnackbarState = {
	open: boolean
	message: string
	severity: 'success' | 'error' | 'warning' | 'info'
	showSnackbar: (message: string, severity?: SnackbarState['severity']) => void
	hideSnackbar: () => void
}

export const useSnackbarStore = create<SnackbarState>(set => ({
	open: false,
	message: '',
	severity: 'info',
	showSnackbar: (message, severity = 'info') => set({ open: true, message, severity }),
	hideSnackbar: () => set({ open: false }),
}))
