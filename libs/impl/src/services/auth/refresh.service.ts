import axios, { AxiosResponse } from 'axios'

import { API_REFRESH_ROUTE } from '../../constants/apiRoutes'
import { getRefreshToken } from '../../handlers/auth/auth.handler'
import { getRoute } from '../../utils/getRoute'
import { RefreshTokenResponseInterface } from '@isomera/interfaces'

export const refreshService = async () => {
  try {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      return {
        data: null,
        status: 401
      }
    }

    const { NX_REACT_APP_API_URL } = process.env
    const axiosInstance = axios.create({
      baseURL: NX_REACT_APP_API_URL,
      headers: {
        Accept: 'application/json'
      }
    })

    const response: AxiosResponse<RefreshTokenResponseInterface> =
      await axiosInstance.post(
        getRoute(API_REFRESH_ROUTE),
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
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
