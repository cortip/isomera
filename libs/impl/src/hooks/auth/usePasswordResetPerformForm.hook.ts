import { useFormik } from 'formik'

import { useNavigate } from 'react-router-dom'

import { pages } from '../../constants/pages'
import {
  ForgotPasswordResetRequestDto,
  formikValidate,
  ResetPasswordRequestDto
} from '@isomera/dtos'
import { useHandleErrorHook } from '../error/useHandleError.hook'
import { Pure, StatusType } from '@isomera/interfaces'
import { usePasswordResetPerformHook } from './usePasswordResetPerform.hook'
import { toast } from 'react-toastify'

const initialValues: Pure<ResetPasswordRequestDto> = {
  newPassword: '',
  passwordResetCode: ''
}

export const usePasswordResetPerformForm = () => {
  const { performReset } = usePasswordResetPerformHook()
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const result = await performReset(values)
      if (result.status === StatusType.OK) {
        toast.success(
          'Password changed successfully. Please log in with your new password.'
        )
      } else {
        toast.error('Password change failed. Please try again.')
      }
      navigate(pages.login.path)
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
