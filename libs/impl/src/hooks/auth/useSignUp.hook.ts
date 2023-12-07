import { useMutation } from 'react-query'

import { SignUpWithEmailCredentialsDto } from '@isomera/dtos'

import { Pure } from '@isomera/interfaces'
import { signUpService } from '../../services/auth/signUp.service'

export const useSignUpHook = () => {
  const { mutateAsync: register, isLoading } = useMutation(
    async (body: Pure<SignUpWithEmailCredentialsDto>) => {
      const data = await signUpService(body)

      return data?.status
    }
  )

  return {
    register,
    isLoading
  }
}
