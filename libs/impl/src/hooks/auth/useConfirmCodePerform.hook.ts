import { useMutation } from 'react-query'

import { Pure } from '@isomera/interfaces'
import { ConfirmationCodeDto } from '@isomera/dtos'
import { confirmCodePerformService } from '../../services/auth/confirmCodePerform.service'

export const userConfirmCodePerformHook = () => {
  const { mutateAsync: performReset, isLoading } = useMutation(
    async (body: Pure<ConfirmationCodeDto>) => {
      const data = await confirmCodePerformService(body)
      return data
    }
  )

  return {
    performReset,
    isLoading
  }
}
