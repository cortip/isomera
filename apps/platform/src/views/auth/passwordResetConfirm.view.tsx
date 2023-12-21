import { usePasswordResetPerformForm } from '@isomera/impl'
import { toast } from 'react-toastify'

export const PasswordResetConfirmView = () => {
  const onSuccess = (message: string) => {
    toast.success(message)
  }

  const onError = (message: string) => {
    toast.error(message)
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = usePasswordResetPerformForm(onSuccess, onError)

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
