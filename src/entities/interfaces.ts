export interface AuthContextType {
	isAuthenticated: boolean | undefined
	login: () => void
	logout: () => void
}

export interface TokenPayload {
	exp: number
}
