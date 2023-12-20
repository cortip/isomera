import 'reflect-metadata'
import { Link, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignInView } from '../views/auth/signIn.view'
import { SignUpView } from '../views/auth/signUp.view'
import { pages } from '@isomera/impl'
import { PasswordResetView } from '../views/auth/passwordReset.view'
import { PasswordResetConfirmView } from '../views/auth/passwordResetConfirm.view'
import { UserInfoView } from '../views/user /info.view'
import { NoProtectedRoute, ProtectedRoute } from './protectedRoute'

const Routes = () => {

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: 'user/info',
          element: (
            <div>
              <UserInfoView />
            </div>
          )
        }
      ]
    }
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <NoProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: (
            <div>
              <SignInView />
              <Link to="/sign-up">Sign Up</Link>
              <Link to={pages.passwordResetRequest.path}>Forgot password</Link>
            </div>
          )
        },
        {
          path: '/sign-up',
          element: (
            <div>
              <SignUpView />
              <Link to="/">Sign up</Link>
            </div>
          )
        },
        {
          path: pages.passwordResetRequest.path,
          element: (
            <div>
              <PasswordResetView />
              <Link to="/">Sign In</Link>
            </div>
          )
        },
        {
          path: pages.passwordResetRequestConfirmation.path,
          element: (
            <div>
              <PasswordResetConfirmView />
              <Link to="/">Sign In</Link>
            </div>
          )
        }
      ]
    }
  ]

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default Routes
