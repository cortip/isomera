import {
  pages,
  useConfirmCodePerformForm,
  useHandleErrorHook
} from '@isomera/impl'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const VerificationCodeView = () => {
  const navigate = useNavigate()
  const { handleError } = useHandleErrorHook()

  const onSuccess = () => {
    toast.success(
      'Activate user successfully. Please log in with your account.'
    )
    navigate(pages.login.path)
  }

  const onError = (error?: unknown) => {
    toast.error('Activate user failed. Please try again.')
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
  } = useConfirmCodePerformForm({ onSuccess, onError })

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
        <label htmlFor="code">Confirmation code received on email</label>
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
          Submit
        </button>
      </div>
    </form>
  )
}
