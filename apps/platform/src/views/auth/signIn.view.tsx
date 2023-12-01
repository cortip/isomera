import { useSignInFormHook } from '@isomera/impl'

export const SignInView = () => {
  // const navigate = useNavigate()
  // const location = useLocation()

  // const from = (location.state?.from.pathname as string) || '/profile'

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = useSignInFormHook()

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success('You successfully logged in')
  //     navigate(from)
  //   }
  //   if (isError) {
  //     if (Array.isArray((error as any).data.error)) {
  //       ;(error as any).data.error.forEach((el: any) =>
  //         toast.error(el.message, {
  //           position: 'top-right'
  //         })
  //       )
  //     } else {
  //       toast.error((error as any).data.message, {
  //         position: 'top-right'
  //       })
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading])

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
