import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useSession from '../hooks/useSession'
import { pages } from '@isomera/impl'

type Props = {
  children: ReactNode
}

function PrivateRoute(props: Props) {
  const { children } = props

  const { isAuthenticated, loadingUserData } = useSession()

  if (loadingUserData) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={pages.login.path} />
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default PrivateRoute