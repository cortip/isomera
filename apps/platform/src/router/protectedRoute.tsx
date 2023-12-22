import { Navigate, Outlet } from 'react-router-dom'
import { pages } from '@isomera/impl'
import useSession from '../hooks/useSession'

export const ProtectedRoute = () => {
  const { isAuthenticated, loadingUserData } = useSession()

  if (loadingUserData) {
    return null
  }

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={pages.login.path} />
  }

  // If authenticated, render the child routes
  return <Outlet />
}

export const NoProtectedRoute = () => {
  const { isAuthenticated } = useSession()

  if (isAuthenticated) {
    return <Navigate to={pages.userInfo.path} />
  }

  // If authenticated, render the child routes
  return <Outlet />
}
