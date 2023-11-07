import 'reflect-metadata'
import { Route, Routes, Link } from 'react-router-dom'
import { SignInWithEmailCredentialsDto } from 'dtos/src/auth/SignInWithEmailCredentials.dto'

export function App() {
  const signindto = new SignInWithEmailCredentialsDto({
    email: 'lalala@lalala.com',
    password: ''
  })
  console.log(signindto.validate())

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
