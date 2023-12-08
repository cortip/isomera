import 'reflect-metadata'
import { Route, Routes, Link } from 'react-router-dom'
import { SignInView } from '../views/auth/signIn.view'
import { SignUpView } from '../views/auth/signUp.view'
import { pages } from '@isomera/impl'
import { PasswordResetView } from '../views/auth/passwordReset.view'
import { PasswordResetConfirmView } from '../views/auth/passwordResetConfirm.view'

export function Router() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SignInView />
              <Link to="/sign-up">Sign Up</Link>
              <Link to={pages.passwordResetRequest.path}>Forgot password</Link>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <div>
              <SignUpView />
              <Link to="/">Sign In</Link>
            </div>
          }
        />
        <Route
          path={pages.passwordResetRequest.path}
          element={
            <div>
              <PasswordResetView />
              <Link to="/">Sign In</Link>
            </div>
          }
        />
        <Route
          path={pages.passwordResetRequestConfirmation.path}
          element={
            <div>
              <PasswordResetConfirmView />
              <Link to="/">Sign In</Link>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default Router
