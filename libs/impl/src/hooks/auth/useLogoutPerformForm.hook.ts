import { useNavigate } from 'react-router-dom'

import { pages } from '../../constants/pages'
import { useHandleErrorHook } from '../error/useHandleError.hook'
import { StatusType } from '@isomera/interfaces'
import { userLogoutPerformHook } from './useLogoutPerform.hook'

export const useLogoutPerformForm = (
  onSuccess: (arg0: string) => void,
  onError: (arg0: string) => void
) => {
  const { performReset } = userLogoutPerformHook()
  const { handleError } = useHandleErrorHook()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const result = await performReset()
      if (result.status === StatusType.OK) {
        onSuccess('Logout successfully.')
      } else {
        onError('Logout failed. Please try again.')
      }
      navigate(pages.login.path)
    } catch (error) {
      handleError(error, { view: 'login' })
    }
  }

  return {
    handleClick
  }
}
