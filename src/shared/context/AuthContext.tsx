import { AuthContextType } from '@/entities/interfaces'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
