import { AxiosError } from 'axios'

import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { ErrorMessageEnum } from '@isomera/interfaces'
import { pascalToSnakeCase } from '@isomera/utils'

interface HandleErrorOptions {
  view: 'login' | 'confirm' | 'register' | 'reset' | 'updatePassword'
}

export const useHandleErrorHook = () => {
  const { t } = useTranslation()

  const handleError = (
    error: AxiosError | any,
    options?: HandleErrorOptions
  ) => {
    console.error(error)

    let msg = ErrorMessageEnum.InternalServerError

    if (error.response && error.response.data.message) {
      msg = error.response.data.message
    }

    let translated = t(`errors_${pascalToSnakeCase(msg)}`) // default

    if (options?.view === 'confirm') {
      if (msg === ErrorMessageEnum.Unauthorized)
        translated = t(`errors_invalid_code`)
    } else if (options?.view === 'login') {
      if (msg === ErrorMessageEnum.Unauthorized)
        translated = t(`errors_invalid_email_password`)
    } else if (options?.view === 'reset') {
      if (msg === ErrorMessageEnum.NotFound)
        translated = t(`errors_invalid_token`)
    } else if (options?.view === 'updatePassword') {
      if (msg === ErrorMessageEnum.Unauthorized)
        translated = t(`invalid_password`)
    }

    toast.error(translated)
  }

  return {
    handleError
  }
}
