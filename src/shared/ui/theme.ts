import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
	typography: {
		fontFamily: `'Montserrat', sans-serif`,
	},
	palette: {
		mode: 'light',
		custom: {
			appBar: '#efefe7',
			icons: '#424242',
			linkCards: '#e2e2e2',
			calendar: {
				selected: '#8E24AA',
				notSelected: 'rgb(107, 105, 105, 0.5)',
				gradient: {
					first: '#c5e1a5',
					second: '#cfd8dc',
				},
			},
		},
		background: {
			default: '#f3f5f4',
			paper: 'white',
		},
		primary: {
			main: '#1976D2',
		},
		secondary: {
			main: '#8E24AA',
		},
		text: {
			primary: '#1E1E1E',
			secondary: '#6E6E6E',
		},
		divider: '#D1D1D1',
	},
})

export const darkTheme = createTheme({
	typography: {
		fontFamily: `'Montserrat', sans-serif`,
	},
	palette: {
		mode: 'dark',
		custom: {
			appBar: 'black',
			icons: 'white',
			linkCard: 'rgb(48, 60, 70)',
			calendar: {
				selected: '#8E24AA',
				notSelected: 'rgb(87, 86, 84, 0.5)',
				background: 'black',
				gradient: {
					first: '#e6f970',
					second: '#cbe2ec',
				},
			},
		},
		background: {
			default: '#1e1e22',
			paper: '#000',
		},
		text: {
			primary: '#fff',
			secondary: '#6E6E6E',
		},
	},
})

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
