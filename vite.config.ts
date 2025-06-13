import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	base: './',
	plugins: [react()],
	define: {
		'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || 'http://localhost:5141/'),
		'import.meta.env.VITE_ALLOW_REGISTRATION': JSON.stringify(process.env.VITE_ALLOW_REGISTRATION) || false,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
})
