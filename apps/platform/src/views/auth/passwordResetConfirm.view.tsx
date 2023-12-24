import {
  pages,
  useHandleErrorHook,
  usePasswordResetPerformForm
} from '@isomera/impl'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const PasswordResetConfirmView = () => {
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const onSuccess = () => {
    toast.success(
      'Password changed successfully. Please log in with your new password.'
    )
    navigate(pages.login.path)
  }

  const onError = (error?: unknown) => {
    toast.error('Password change failed. Please try again.')
    if (error) {
      handleError(error, { view: 'login' })
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
  } = usePasswordResetPerformForm({ onSuccess, onError })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          required
        />
        {touched.newPassword && errors.newPassword && (
          <span>{errors.newPassword}</span>
        )}
      </div>
      <div>
        <label htmlFor="passwordResetCode">
          Confirmation code received on email
        </label>
        <input
          id="passwordResetCode"
          name="passwordResetCode"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordResetCode}
          required
        />
        {touched.passwordResetCode && errors.passwordResetCode && (
          <span>{errors.passwordResetCode}</span>
        )}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  )
}
