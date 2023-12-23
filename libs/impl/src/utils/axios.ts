import axios, { AxiosError } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { clearAuthState, getAccessToken, setAuthState } from '../handlers'
import { refreshService } from '../services'

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

  setAuthState({
    accessToken: data.access_token,
    refreshToken: data.refresh_token
  })

  return Promise.resolve()
}

createAuthRefreshInterceptor(axiosInstance, clientRefreshAuthLogic, {
  statusCodes: [401, 403]
})
