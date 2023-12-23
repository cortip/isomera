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

function Router() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute></PrivateRoute>} />

      <Route
        path={pages.verificationCode.path}
        element={
          <PublicRoute>
            <VerificationCodeView />
            <Link to={pages.login.path}>Sign In</Link>
          </PublicRoute>
        }
      />

      <Route
        path={pages.passwordResetRequestConfirmation.path}
        element={
          <PublicRoute>
            <PasswordResetConfirmView />
            <Link to={pages.login.path}>Sign In</Link>
          </PublicRoute>
        }
      />

      <Route
        path={pages.passwordResetRequest.path}
        element={
          <PublicRoute>
            <PasswordResetView />
            <Link to={pages.login.path}>Sign In</Link>
          </PublicRoute>
        }
      />

      <Route
        path="/sign-up"
        element={
          <PublicRoute>
            <SignUpView />
            <Link to={pages.login.path}>Sign in</Link>
          </PublicRoute>
        }
      />

      <Route
        path={pages.login.path}
        element={
          <PublicRoute>
            <SignInView />
            <Link to="/sign-up">Sign Up</Link>
            <Link to={pages.passwordResetRequest.path}>Forgot password</Link>
          </PublicRoute>
        }
      />

      <Route
        path={pages.userInfo.path}
        element={
          <PrivateRoute>
            <UserInfoView />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default Router
