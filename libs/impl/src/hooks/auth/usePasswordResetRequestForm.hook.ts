import { useFormik } from 'formik'

import { useNavigate } from 'react-router-dom'

import { pages } from '../../constants/pages'
import { formikValidate } from '@isomera/dtos'
import { useHandleErrorHook } from '../error/useHandleError.hook'
import { Pure } from '@isomera/interfaces'
import { usePasswordResetRequestHook } from './usePasswordResetRequest.hook'
import { ForgotPasswordResetRequestDto } from '@isomera/dtos'

const initialValues: Pure<ForgotPasswordResetRequestDto> = {
  email: ''
}

export const usePasswordResetRequestForm = (
  onSuccess: (arg0: string) => void
) => {
  const { requestReset } = usePasswordResetRequestHook()
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await requestReset(values)
      onSuccess(
        `If there was such user registered with email ${values.email}, then you'll receive confirmation code.`
      )
      navigate(pages.passwordResetRequestConfirmation.path)
    } catch (error) {
      handleError(error, { view: 'login' })
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
