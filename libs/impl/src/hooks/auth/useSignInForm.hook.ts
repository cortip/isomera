import { useFormik } from 'formik'

import { useNavigate } from 'react-router-dom'

import { pages } from '../../constants/pages'
import { useSignInHook } from './useSignIn.hook'
import { formikValidate, SignInWithEmailCredentialsDto } from '@isomera/dtos'
import { useHandleErrorHook } from '../error/useHandleError.hook'
import { LoginResponseInterface, Pure } from '@isomera/interfaces'

const initialValues: Pure<SignInWithEmailCredentialsDto> = {
  email: '',
  password: ''
}

export const useSignInFormHook = (
  onSuccess: (arg0: LoginResponseInterface) => void
) => {
  const { login } = useSignInHook()
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const data = await login(values)
      onSuccess(data)
      navigate(pages.userInfo.path)
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
