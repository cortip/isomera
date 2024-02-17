import { ReactNode, useEffect, useState, useCallback } from 'react'
import {
  clearAuthState,
  getAccessToken,
  getUserService,
  setAuthState
} from '@isomera/impl'
import AuthContext from '../contexts/authContext'
import { UserInterface } from '@isomera/interfaces'

type Props = {
  children: ReactNode
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserInterface | undefined>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null)
  const [recoveryViewed, setRecoveryViewed] = useState<boolean>(false)

  const updateRecoveryCodes = (codes?: string[]) => {
    if (codes) {
      setRecoveryCodes(codes)
    } else {
      setRecoveryCodes(null)
    }
  }

  const updateRecoveryViewed = () => {
    setRecoveryViewed(true)
  }

  const fetchUser = useCallback(async () => {
    const token = getAccessToken()
    if (token) {
      setLoadingUserData(true)
      try {
        const userData = await getUserService()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        clearAuthState()
      } finally {
        setLoadingUserData(false)
      }
    } else {
      setUser(undefined)
      setLoadingUserData(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const loginWith2FA = useCallback(
    (accessToken: string, refreshToken: string) => {
      setAuthState({ accessToken, refreshToken })
      fetchUser()
    },
    [fetchUser]
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loadingUserData,
        setUser,
        loginWith2FA,
        updateRecoveryCodes,
        recoveryCodes,
        recoveryViewed,
        updateRecoveryViewed
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
