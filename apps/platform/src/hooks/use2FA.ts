import { useMutation } from 'react-query'
import { Pure } from '@isomera/interfaces'
import {
  Verify2FAData,
  turnOn2FAServiceStep1,
  turnOn2FAStep2Service,
  auth2FAService,
  authDisableService,
  Recover2FAData,
  turnOff2FA2Service
} from '@isomera/impl'
import useSession from './useSession'

const useTwoFactorAuthHook = () => {
  const { loginWith2FA } = useSession()
  const { mutateAsync: generate2FA, isLoading: isLoadingGenerate } =
    useMutation(async () => {
      const response = await turnOn2FAServiceStep1()
      return response
    })

  const { mutateAsync: verify2FA, isLoading: isLoadingVerify } = useMutation(
    async (data: Pure<Verify2FAData>) => {
      const response = await turnOn2FAStep2Service(data)
      if (response?.access_token) {
        loginWith2FA(response.access_token, response.refresh_token)
      }
      return response
    }
  )

  const { mutateAsync: authenticate, isLoading: isLoadingAuthenticate } =
    useMutation(async (data: Pure<Verify2FAData>) => {
      const response = await auth2FAService(data)
      return response
    })

  const { mutateAsync: disable2FA, isLoading: isLoadingDisable } = useMutation(
    async (data: Pure<Recover2FAData>) => {
      const response = await authDisableService(data)
      return response
    }
  )

  const { mutateAsync: turnOff2FA, isLoading: isLoadingTurnOf2FA } =
    useMutation(async (data: Pure<Verify2FAData>) => {
      const response = await turnOff2FA2Service(data)
      return response
    })

  return {
    generate2FA,
    verify2FA,
    authenticate,
    disable2FA,
    turnOff2FA,
    isLoading:
      isLoadingGenerate ||
      isLoadingVerify ||
      isLoadingAuthenticate ||
      isLoadingDisable ||
      isLoadingTurnOf2FA
  }
}

export { useTwoFactorAuthHook }
