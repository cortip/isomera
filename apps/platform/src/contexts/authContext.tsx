import { UserInterface } from '@isomera/interfaces'
import { createContext } from 'react'

export type AuthContextData = {
  user?: UserInterface
  isAuthenticated: boolean
  loadingUserData: boolean
  setUser: (user: UserInterface | undefined) => void
  loginWith2FA: (accessToken: string, refreshToken: string) => void
}

const AuthContext = createContext({} as AuthContextData)

export default AuthContext
