import {
  HandleErrorOptions,
  Recover2FAData,
  auth2FARecoveryService
} from '@isomera/impl'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface Options {
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
  userEmail?: string
}

export const useRecoveryHook = (options: Options) => {
  const { onSuccess, onError, userEmail } = options

  const initialValues: Recover2FAData = {
    code: '',
    email: userEmail ?? ''
  }

  const validationSchema = Yup.object({
    code: Yup.string().required('2FA code is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
  })

  const onSubmit = async (values: Recover2FAData) => {
    try {
      const response = await auth2FARecoveryService(values)
      onSuccess && onSuccess(response)
    } catch (error) {
      onError && onError(error)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return {
    ...formik,
    isLoading: formik.isSubmitting
  }
}
