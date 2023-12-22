import { ReactNode, useEffect, useState } from 'react'
import { clearAuthState, getAccessToken, getUserService } from '@isomera/impl'
import AuthContext from '../contexts/authContext'
import { UserInterface } from '@isomera/interfaces'

type Props = {
  children: ReactNode
}

function AuthProvider(props: Props) {
  const { children } = props

  const [user, setUser] = useState<UserInterface>()
  const [loadingUserData, setLoadingUserData] = useState(true)

  const token = getAccessToken()
  const isAuthenticated = Boolean(token)

  useEffect(() => {
    if (!token) {
      clearAuthState()
      setUser(undefined)
      setLoadingUserData(false)
    }
  }, [token])

  useEffect(() => {
    const token = getAccessToken()

    if (token) {
      setLoadingUserData(true)
      getUserService().then(data => {
        setUser(data)
        setLoadingUserData(false)
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider