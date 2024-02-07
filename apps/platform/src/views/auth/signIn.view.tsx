import { pages, useHandleErrorHook, useSignInFormHook } from '@isomera/impl'
import { UserInterface } from '@isomera/interfaces'
import useSession from '../../hooks/useSession'
import { useNavigate } from 'react-router-dom'

export const SignInView = () => {
  const { setUser } = useSession()
  const navigate = useNavigate()
  const { handleError } = useHandleErrorHook()

  const onSuccess = (data: UserInterface) => {
    setUser(data)
    console.log({ data })
    if (data && data.isTwoFAEnabled && !data.isTwoFactorAuthenticated) {
      navigate(pages.twoFA.path)
    } else {
      navigate(pages.dashboard.path)
    }
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = useSignInFormHook({
    onSuccess,
    onError: error => handleError(error, { view: 'login' })
  })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          required
        />
        {touched.email && errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          required
        />
        {touched.password && errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Sign In
        </button>
      </div>
    </form>
  )
}
