import { useMutation } from 'react-query'
import { logoutPerformService } from '../../services'

export const userLogoutPerformHook = () => {
  const { mutateAsync: performReset, isLoading } = useMutation(async () => {
    const data = await logoutPerformService()
    return data
  })

  return {
    performReset,
    isLoading
  }
}
