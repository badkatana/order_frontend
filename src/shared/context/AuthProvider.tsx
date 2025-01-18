import { TokenPayload } from '@/entities/interfaces'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

// @ts-ignore
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		const isAuth = checkAuth()
		setIsAuthenticated(isAuth)
	}, [])

	const login = () => {
		setIsAuthenticated(true)
		navigate('/calenders')
	}

	const logout = () => {
		setIsAuthenticated(false)
		sessionStorage.removeItem('access_token')
		navigate('/')
	}

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

const checkAuth = () => {
	const token = sessionStorage.getItem('access_token')

	if (!token) {
		return false
	}

	try {
		const decoded: TokenPayload = jwtDecode(token)
		const isExpired = decoded.exp * 1000 < Date.now()

		return !isExpired
	} catch (error) {
		console.error('Ошибка при декодировании токена', error)
		return false
	}
}
