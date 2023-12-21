import { useFormik } from 'formik'

import { useNavigate } from 'react-router-dom'

import { pages } from '../../constants/pages'
import { ConfirmationCodeDto, formikValidate } from '@isomera/dtos'
import { useHandleErrorHook } from '../error/useHandleError.hook'
import { Pure, StatusType } from '@isomera/interfaces'
import { toast } from 'react-toastify'
import { userConfirmCodePerformHook } from './useConfirmCodePerform.hook'

const initialValues: Pure<ConfirmationCodeDto> = {
  code: '',
  email: ''
}

export const useConfirmCodePerformForm = () => {
  const { performReset } = userConfirmCodePerformHook()
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const result = await performReset(values)
      if (result.status === StatusType.OK) {
        toast.success(
          'Activate user successfully. Please log in with your account.'
        )
      } else {
        toast.error('Activate user failed. Please try again.')
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
