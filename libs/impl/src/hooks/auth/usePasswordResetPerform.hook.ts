import { useMutation } from 'react-query'

import { Pure } from '@isomera/interfaces'
import { ResetPasswordRequestDto } from '@isomera/dtos'
import { passwordResetPerformService } from '../../services/auth/passwordResetPerform.service'

export const usePasswordResetPerformHook = () => {
  const { mutateAsync: performReset, isLoading } = useMutation(
    async (body: Pure<ResetPasswordRequestDto>) => {
      const data = await passwordResetPerformService(body)
      return data
    }
  )

  return {
    performReset,
    isLoading
  }
}
