import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import routes from './app/routes/Routes'
import { isAuthenticated } from './shared/api'
import { theme } from './shared/ui/theme'

function App() {
	const queryClient = new QueryClient()
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<Routes>
						{routes.map(route => {
							if (route.protected) {
								return (
									<Route
										key={route.path}
										path={route.path}
										element={isAuthenticated() ? <route.element /> : <Navigate to='/' />}
									/>
								)
							}
							return <Route key={route.path} path={route.path} element={<route.element />} />
						})}
					</Routes>
				</ThemeProvider>
			</QueryClientProvider>
		</Router>
	)
}

export default App
