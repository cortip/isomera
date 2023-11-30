import { useMutation } from 'react-query'

import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

import { setConfirmState } from '../../handlers/auth/auth.handler'
import { signInService } from '../../services/auth/signIn.service'
import { Pure } from '@isomera/interfaces'

export const useSignInHook = () => {
  const { mutateAsync: login, isLoading } = useMutation(
    async (body: Pure<SignInWithEmailCredentialsDto>) => {
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
