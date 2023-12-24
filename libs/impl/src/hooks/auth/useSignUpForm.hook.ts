import { useFormik } from 'formik'
import { formikValidate, SignUpWithEmailCredentialsDto } from '@isomera/dtos'
import { Pure } from '@isomera/interfaces'
import { useSignUpHook } from './useSignUp.hook'

const initialValues: Pure<SignUpWithEmailCredentialsDto> = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  isPrivacyPolicyAccepted: undefined
}

interface Options {
  onSuccess?: () => void
  onError?: (error?: unknown) => void
}

export const useSignUpFormHook = (options: Options) => {
  const { register } = useSignUpHook()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await register(values)
      options.onSuccess && options.onSuccess()
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
    setFieldValue,
    isSubmitting
  } = useFormik({
    initialValues,
    validate: values => formikValidate(SignUpWithEmailCredentialsDto, values),
    onSubmit
  })

  return {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }
}
