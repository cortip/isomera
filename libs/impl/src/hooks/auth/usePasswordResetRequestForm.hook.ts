import { useFormik } from 'formik'
import { formikValidate } from '@isomera/dtos'
import { Pure } from '@isomera/interfaces'
import { usePasswordResetRequestHook } from './usePasswordResetRequest.hook'
import { ForgotPasswordResetRequestDto } from '@isomera/dtos'

const initialValues: Pure<ForgotPasswordResetRequestDto> = {
  email: ''
}

interface Options {
  onSuccess?: () => void
  onError?: (error?: unknown) => void
}

export const usePasswordResetRequestForm = (options: Options) => {
  const { requestReset } = usePasswordResetRequestHook()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await requestReset(values)
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
    isSubmitting
  } = useFormik({
    initialValues,
    validate: values => formikValidate(ForgotPasswordResetRequestDto, values),
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
