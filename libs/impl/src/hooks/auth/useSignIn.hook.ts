import { useMutation } from 'react-query'

import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

import { setConfirmState } from '../../handlers'
import { signInService } from '../../services'
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
