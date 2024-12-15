import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import routes from './app/routes/Routes'
import { isAuthenticated } from './shared/api/authRoutes'

function App() {
	const queryClient = new QueryClient()
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
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
			</QueryClientProvider>
		</Router>
	)
}

export default App
