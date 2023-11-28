import { useFormik } from 'formik'

import { useNavigate } from 'react-router-dom'

import { pages } from '../../constants/pages'
import { useSignInHook } from './useSignIn.hook'
import { formikValidate, SignInWithEmailCredentialsDto } from '@isomera/dtos'
import { useHandleErrorHook } from '../error/useHandleError.hook'

const initialValues: Omit<SignInWithEmailCredentialsDto, 'validate'> = {
  email: '',
  password: ''
}

export const useSignInFormHook = () => {
  const { login } = useSignInHook()
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await login(values)
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
