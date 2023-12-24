import { useFormik } from 'formik'
import { formikValidate, ResetPasswordRequestDto } from '@isomera/dtos'
import { Pure, StatusType } from '@isomera/interfaces'
import { usePasswordResetPerformHook } from './usePasswordResetPerform.hook'

const initialValues: Pure<ResetPasswordRequestDto> = {
  newPassword: '',
  passwordResetCode: ''
}

interface Options {
  onSuccess: () => void
  onError: (error?: unknown) => void
}

export const usePasswordResetPerformForm = (options: Options) => {
  const { performReset } = usePasswordResetPerformHook()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const result = await performReset(values)
      if (result.status === StatusType.OK) {
        options.onSuccess && options.onSuccess()
      } else {
        options.onError && options.onError()
      }
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
    validate: values => formikValidate(ResetPasswordRequestDto, values),
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
