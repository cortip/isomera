import { useSignUpFormHook } from '@isomera/impl'

export const SignUpView = () => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = useSignUpFormHook()
  console.log('val', values)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          required
        />
        {touched.firstName && errors.firstName && (
          <span>{errors.firstName}</span>
        )}
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          required
        />
        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}
      </div>
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
        <input
          id="isPrivacyPolicyAccepted"
          name="isPrivacyPolicyAccepted"
          type="checkbox"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.isPrivacyPolicyAccepted ? ['on'] : ''}
          required
        />
        <label htmlFor="isPrivacyPolicyAccepted">
          I agree to privacy policy
        </label>
        {touched.isPrivacyPolicyAccepted && errors.isPrivacyPolicyAccepted && (
          <span>{errors.isPrivacyPolicyAccepted}</span>
        )}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </div>
    </form>
  )
}
