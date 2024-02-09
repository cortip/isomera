import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useSession from '../hooks/useSession'
import { pages } from '@isomera/impl'
import { Verify2FAView } from '../views/auth/auth2FA.view'

type Props = {
  children: ReactNode
}

function PrivateRoute(props: Readonly<Props>) {
  const { children } = props

  const { isAuthenticated, loadingUserData, user } = useSession()

  if (loadingUserData) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={pages.login.path} />
  }

  if (!user || (user?.isTwoFAEnabled && !user?.isTwoFactorAuthenticated)) {
    return <Navigate to={pages.twoFA.path} />
  }

  return children
}

export default PrivateRoute
