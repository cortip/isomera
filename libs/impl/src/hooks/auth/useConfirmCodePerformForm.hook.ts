import { useFormik } from 'formik'
import { ConfirmationCodeDto, formikValidate } from '@isomera/dtos'
import { Pure, StatusType } from '@isomera/interfaces'
import { userConfirmCodePerformHook } from './useConfirmCodePerform.hook'

const initialValues: Pure<ConfirmationCodeDto> = {
  code: '',
  email: ''
}

interface Options {
  onSuccess?: () => void
  onError?: (error?: unknown) => void
}

export const useConfirmCodePerformForm = (options: Options) => {
  const { performReset } = userConfirmCodePerformHook()

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
    validate: values => formikValidate(ConfirmationCodeDto, values),
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
