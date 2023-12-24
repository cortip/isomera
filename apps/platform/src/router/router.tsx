import 'reflect-metadata'
import { Link } from 'react-router-dom'
import { SignInView } from '../views/auth/signIn.view'
import { SignUpView } from '../views/auth/signUp.view'
import { pages } from '@isomera/impl'
import { PasswordResetView } from '../views/auth/passwordReset.view'
import { PasswordResetConfirmView } from '../views/auth/passwordResetConfirm.view'
import { UserInfoView } from '../views/user /info.view'
import PublicRoute from './publicRoute'
import { VerificationCodeView } from '../views/auth/verificationCode.view'

import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute'
import { PublicLayout } from '../layouts/public.layout'
import { PrivateLayout } from '../layouts/private.layout'

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <div>...</div>
            </PrivateLayout>
          </PrivateRoute>
        }
      />

      <Route
        path={pages.verificationCode.path}
        element={
          <PublicRoute>
            <PublicLayout>
              <VerificationCodeView />
              <Link to={pages.login.path}>Sign In</Link>
            </PublicLayout>
          </PublicRoute>
        }
      />

      <Route
        path={pages.passwordResetRequestConfirmation.path}
        element={
          <PublicRoute>
            <PublicLayout>
              <PasswordResetConfirmView />
              <Link to={pages.login.path}>Sign In</Link>
            </PublicLayout>
          </PublicRoute>
        }
      />

      <Route
        path={pages.passwordResetRequest.path}
        element={
          <PublicRoute>
            <PublicLayout>
              <PasswordResetView />
              <Link to={pages.login.path}>Sign In</Link>
            </PublicLayout>
          </PublicRoute>
        }
      />

      <Route
        path={pages.register.path}
        element={
          <PublicRoute>
            <PublicLayout>
              <SignUpView />
              <Link to={pages.login.path}>Sign in</Link>
            </PublicLayout>
          </PublicRoute>
        }
      />

      <Route
        path={pages.login.path}
        element={
          <PublicRoute>
            <PublicLayout>
              <SignInView />
              <Link to={pages.register.path}>Sign Up</Link>
              <Link to={pages.passwordResetRequest.path}>Forgot password</Link>
            </PublicLayout>
          </PublicRoute>
        }
      />

      <Route
        path={pages.userInfo.path}
        element={
          <PrivateRoute>
            <PrivateLayout>
              <UserInfoView />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default Router
