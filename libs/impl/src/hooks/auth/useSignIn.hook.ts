import { useMutation } from 'react-query'

import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

import { setConfirmState } from '../../handlers/auth/auth.handler'
import { signInService } from '../../services/auth/signIn.service'

export const useSignInHook = () => {
  const { mutateAsync: login, isLoading } = useMutation(
    async (body: Omit<SignInWithEmailCredentialsDto, 'validate'>) => {
      const data = await signInService(body)

      if (data?.confirmToken) {
        setConfirmState({
          confirmToken: data.confirmToken
        })
      }
    }
  )

  return {
    login,
    isLoading
  }
}
