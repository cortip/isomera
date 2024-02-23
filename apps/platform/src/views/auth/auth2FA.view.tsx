import { useNavigate } from 'react-router-dom'
import useSession from '../../hooks/useSession'
import { pages, useHandleErrorHook } from '@isomera/impl'
import { useVerify2FAHook } from '../../hooks/verify2FAHook'

export const Verify2FAView = () => {
  const { loginWith2FA } = useSession()
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
  } = useVerify2FAHook({
    onSuccess,
    onError: (error: any) => handleError(error, { view: '2fa' })
  })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="twoFactorCode">2FA Code</label>
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
          Verify
        </button>
      </div>
    </form>
  )
}
