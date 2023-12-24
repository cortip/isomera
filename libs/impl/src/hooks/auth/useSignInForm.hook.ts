import { useFormik } from 'formik'
import { useSignInHook } from './useSignIn.hook'
import { formikValidate, SignInWithEmailCredentialsDto } from '@isomera/dtos'
import { LoginResponseInterface, Pure } from '@isomera/interfaces'

const initialValues: Pure<SignInWithEmailCredentialsDto> = {
  email: '',
  password: ''
}

interface Options {
  onSuccess?: (arg0: LoginResponseInterface) => void
  onError?: (error?: unknown) => void
}

export const useSignInFormHook = (options: Options) => {
  const { login } = useSignInHook()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const data = await login(values)
      options.onSuccess && options.onSuccess(data)
    } catch (error) {
      options.onError && options.onError(error)
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
  } = useFormik({
    initialValues,
    validate: values => formikValidate(SignInWithEmailCredentialsDto, values),
    onSubmit
  })

  return {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting
  }
}
