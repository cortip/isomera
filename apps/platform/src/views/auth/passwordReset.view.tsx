import { usePasswordResetRequestForm } from '@isomera/impl'
import { toast } from 'react-toastify'

export const PasswordResetView = () => {
  // const navigate = useNavigate()
  // const location = useLocation()

  // const from = (location.state?.from.pathname as string) || '/profile'

  const onSuccess = (message: string) => {
    toast.success(message)
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  } = usePasswordResetRequestForm(onSuccess)

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
        <button type="submit" disabled={isSubmitting}>
          Sent confirmation code
        </button>
      </div>
    </form>
  )
}
