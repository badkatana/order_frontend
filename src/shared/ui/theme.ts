import { createTheme } from '@mui/material'

export const theme = createTheme({
	typography: {
		fontFamily: `'Montserrat', sans-serif`,
	},
	palette: {
		mode: 'dark',
		background: {
			default: '#000',
			paper: '#000',
		},
		text: {
			primary: '#fff',
		},
	},
})
