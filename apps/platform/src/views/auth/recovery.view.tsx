import { useNavigate } from 'react-router-dom'
import useSession from '../../hooks/useSession'
import { pages, useHandleErrorHook } from '@isomera/impl'
import { useRecoveryHook } from '../../hooks/Recover2FAHook'

export const Recovery2FAView = () => {
  const { loginWith2FA, user } = useSession()
  const navigate = useNavigate()
  const { handleError } = useHandleErrorHook()

  const onSuccess = (data: { access_token: string; refresh_token: string }) => {
    loginWith2FA(data.access_token, data.refresh_token)
    navigate(pages.dashboard.path)
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = useRecoveryHook({
    onSuccess,
    onError: (error: any) => handleError(error, { view: 'recovery' }),
    userEmail: user?.email
  })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recoveryCode">Recovery Code</label>
        <input
          id="code"
          name="code"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.code}
          required
        />
        {touched.code && errors.code && <span>{errors.code}</span>}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Recover Account
        </button>
      </div>
    </form>
  )
}
