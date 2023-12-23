import { AxiosResponse } from 'axios'

import { API_USER_ROUTE } from '../../constants/apiRoutes'
import { getAccessToken } from '../../handlers/auth/auth.handler'
import { axiosInstance } from '../../utils/axios'
import { getRoute } from '../../utils/getRoute'
import { UserInterface } from '@isomera/interfaces'

export const getUserService = async () => {
  try {
    const accessToken = getAccessToken()

    if (!accessToken) return undefined

    const response: AxiosResponse<UserInterface> = await axiosInstance.get(
      getRoute(API_USER_ROUTE)
    )

    return response?.data ?? undefined
  } catch {
    return undefined
  }
}
