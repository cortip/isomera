import { useFormik } from 'formik'
import { SignInWithEmailCredentialsDto } from '@isomera/dtos'
import { formikValidate } from '@isomera/dtos'

export const SignInView = () => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => formikValidate(SignInWithEmailCredentialsDto, values),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
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
