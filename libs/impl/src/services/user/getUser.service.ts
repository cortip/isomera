import { AxiosResponse } from 'axios'

import { API_USER_ROUTE } from '../../constants/apiRoutes'
import { getAccessToken } from '../../handlers/auth/auth.handler'
import { axiosInstance } from '../../utils/axios'
import { getRoute } from '../../utils/getRoute'
import { UserResponseDto } from '@isomera/dtos'

export const getUserService = async () => {
  try {
    const accessToken = getAccessToken()

    if (!accessToken) return null

    const response: AxiosResponse<UserResponseDto> = await axiosInstance.get(
      getRoute(API_USER_ROUTE)
    )

    return response?.data ?? null
  } catch {
    return null
  }
}
