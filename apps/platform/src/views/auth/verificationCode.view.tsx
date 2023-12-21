import { useConfirmCodePerformForm } from '@isomera/impl'

export const VerificationCodeView = () => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = useConfirmCodePerformForm()

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
