import { AxiosResponse } from 'axios'

import { API_REFRESH_ROUTE } from '../../constants/apiRoutes'
import { getRefreshToken } from '../../handlers/auth/auth.handler'
import { axiosInstance } from '../../utils/axios'
import { getRoute } from '../../utils/getRoute'
import { UserResponseDto } from '@isomera/dtos'

export const refreshService = async () => {
  try {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      return {
        data: null,
        status: 401
      }
    }

    const response: AxiosResponse<UserResponseDto> = await axiosInstance.post(
      getRoute(API_REFRESH_ROUTE),
      {
        refreshToken
      }
    )

    return {
      data: response?.data,
      status: response?.status
    }
  } catch (error) {
    return {
      data: null,
      status: 401
    }
  }
}
