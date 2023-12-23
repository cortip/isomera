import { AxiosResponse } from 'axios'

import { API_LOGOUT_ROUTE } from '../../constants'
import { axiosInstance } from '../../utils'
import { getRoute } from '../../utils'
import { LogoutResponseInterface } from '@isomera/interfaces'

export const logoutPerformService = async () => {
  const response: AxiosResponse<LogoutResponseInterface> =
    await axiosInstance.post(getRoute(API_LOGOUT_ROUTE))

  return response?.data
}
