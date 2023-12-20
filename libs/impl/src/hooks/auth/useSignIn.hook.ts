import { useMutation } from 'react-query'

import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

import { setAuthState } from '../../handlers'
import { signInService } from '../../services'
import { Pure } from '@isomera/interfaces'

export const useSignInHook = () => {
  const { mutateAsync: login, isLoading } = useMutation(
    async (body: Pure<SignInWithEmailCredentialsDto>) => {
      const data = await signInService(body)

      if (data?.access_token) {
        setAuthState({
          accessToken: data.access_token,
          refreshToken: data.refresh_token
        })
      }
    }
  )

  return {
    login,
    isLoading
  }
}
