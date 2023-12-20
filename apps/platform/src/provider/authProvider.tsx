import { getAccessToken } from '@isomera/impl'
import axios from 'axios'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface AuthContextType {
  token: string | null
  // Other authentication-related properties/methods...
}

// Define the type for the AuthProvider props
type AuthProviderProps = {
  children: React.ReactNode
  // You can include other props for the AuthProvider here if needed
}

const AuthContext = createContext<AuthContextType>({
  token: ''
})

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(getAccessToken())

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken)
  }

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken
    }),
    [token]
  )

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}

export default AuthProvider
