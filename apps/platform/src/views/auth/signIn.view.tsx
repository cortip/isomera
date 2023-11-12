import { useFormik } from 'formik'
import { SignInWithEmailCredentialsDto } from '@isomera/dtos'
import { formikValidate } from '@isomera/dtos'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../redux/api/auth.api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const SignInView = () => {
  // 👇 API Login Mutation
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation()

  const navigate = useNavigate()
  const location = useLocation()

  const from = ((location.state as any)?.from.pathname as string) || '/profile'

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
      // 👇 Executing the loginUser Mutation
      loginUser(values)
    }
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in')
      navigate(from)
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        ;(error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right'
          })
        )
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right'
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

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
