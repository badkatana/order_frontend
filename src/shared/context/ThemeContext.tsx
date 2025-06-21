// ThemeContext.tsx
import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { darkTheme, lightTheme } from '../ui/theme'

type ThemeMode = 'light' | 'dark'

interface ThemeContextProps {
	mode: ThemeMode
	setMode: (mode: ThemeMode) => void
	toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useAppTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useAppTheme must be used within ThemeContextProvider')
	return context
}

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
	const getInitialMode = (): ThemeMode => {
		const saved = localStorage.getItem('theme')
		if (saved === 'light' || saved === 'dark') return saved
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}

	const [mode, setMode] = useState<ThemeMode>(getInitialMode)
	const toggleMode = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'))
	const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode])

	return (
		<ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}
