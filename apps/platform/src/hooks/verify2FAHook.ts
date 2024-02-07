import { Verify2FAData } from '@isomera/impl'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTwoFactorAuthHook } from './use2FA'

const initialValues: Verify2FAData = {
  code: ''
}

const validationSchema = Yup.object({
  code: Yup.string().required('2FA code is required')
})

interface Options {
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}

export const useVerify2FAHook = (options: Options) => {
  const { authenticate, isLoading } = useTwoFactorAuthHook()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await authenticate({
        code: values.code.split(' ').join('')
      })
      options.onSuccess && options.onSuccess(response)
    } catch (error) {
      options.onError && options.onError(error)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return {
    ...formik,
    isLoading
  }
}
