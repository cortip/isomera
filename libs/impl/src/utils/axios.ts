import axios, { AxiosError } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import {
  clearAuthState,
  getAccessToken,
  setAuthState
} from '../handlers/auth/auth.handler'
import { refreshService } from '../services/auth/refresh.service'

const { NX_REACT_APP_API_URL } = process.env

export const axiosInstance = axios.create({
  baseURL: NX_REACT_APP_API_URL,
  headers: {
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getAccessToken()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const clientRefreshAuthLogic = async (failedRequest: AxiosError) => {
  const { data, status } = await refreshService()

  if (status !== 200 || !data) {
    clearAuthState()

    return Promise.reject(failedRequest)
  }

  setAuthState(data)

  return Promise.resolve()
}

createAuthRefreshInterceptor(axiosInstance, clientRefreshAuthLogic, {
  statusCodes: [401, 403]
})
