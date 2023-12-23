import { useFormik } from 'formik'

import { useNavigate } from 'react-router-dom'

import { pages } from '../../constants/pages'
import { formikValidate, SignUpWithEmailCredentialsDto } from '@isomera/dtos'
import { useHandleErrorHook } from '../error/useHandleError.hook'
import { Pure } from '@isomera/interfaces'
import { useSignUpHook } from './useSignUp.hook'

const initialValues: Pure<SignUpWithEmailCredentialsDto> = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  isPrivacyPolicyAccepted: undefined
}

export const useSignUpFormHook = () => {
  const { register } = useSignUpHook()
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await register(values)
      navigate(pages.verificationCode.path)
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
