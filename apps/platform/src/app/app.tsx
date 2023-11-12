import 'reflect-metadata'
import { Route, Routes, Link } from 'react-router-dom'
import { SignInView } from '../views/auth/signIn.view'
import { SignUpView } from '../views/auth/signUp.view'

export function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SignInView />
              <Link to="/sign-up">Sign Up</Link>
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
      </Routes>
    </div>
  )
}

export default App
