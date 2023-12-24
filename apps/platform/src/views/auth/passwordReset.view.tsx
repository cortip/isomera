import {
  pages,
  useHandleErrorHook,
  usePasswordResetRequestForm
} from '@isomera/impl'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const PasswordResetView = () => {
  const navigate = useNavigate()
  const { handleError } = useHandleErrorHook()

  const onSuccess = () => {
    toast.success(
      "If there was such user registered with email, then you'll receive confirmation code."
    )
    navigate(pages.passwordResetRequestConfirmation.path)
  }

  const onError = (error?: unknown) => {
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
  } = usePasswordResetRequestForm({ onSuccess, onError })

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
        <button type="submit" disabled={isSubmitting}>
          Sent confirmation code
        </button>
      </div>
    </form>
  )
}
