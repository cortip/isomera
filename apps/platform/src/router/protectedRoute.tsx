import { Navigate, Outlet } from 'react-router-dom'
import { getAccessToken, pages } from '@isomera/impl'

export const ProtectedRoute = () => {
  const token = getAccessToken()

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to={pages.login.path} />
  }

  // If authenticated, render the child routes
  return <Outlet />
}

export const NoProtectedRoute = () => {
  const token = getAccessToken()

  // Check if the user is authenticated
  if (token) {
    // If not authenticated, redirect to the login page
    return <Navigate to={pages.userInfo.path} />
  }

  // If authenticated, render the child routes
  return <Outlet />
}
