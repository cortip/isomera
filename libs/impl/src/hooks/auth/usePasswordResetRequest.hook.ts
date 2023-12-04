import { useMutation } from 'react-query'

import { Pure } from '@isomera/interfaces'
import { ForgotPasswordResetRequestDto } from '@isomera/dtos'
import { passwordResetRequestService } from '../../services/auth/passwordReset.service'

export const usePasswordResetRequestHook = () => {
  const { mutateAsync: requestReset, isLoading } = useMutation(
    async (body: Pure<ForgotPasswordResetRequestDto>) => {
      const data = await passwordResetRequestService(body)
      return data
    }
  )

  return {
    requestReset,
    isLoading
  }
}
