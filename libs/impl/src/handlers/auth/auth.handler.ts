import {
  ACCESS_TOKEN_KEY,
  CONFIRM_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '../../constants/storage'

interface ISetAuthStateParams {
  accessToken: string
  refreshToken: string
}

interface ISetConfirmParams {
  confirmToken: string
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (!accessToken) {
    return null
  }

  return accessToken
}

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (!refreshToken) {
    return null
  }

  return refreshToken
}

export const getConfirmToken = () => {
  const confirmToken = localStorage.getItem(CONFIRM_TOKEN_KEY)

  if (!confirmToken) {
    return null
  }

  return confirmToken
}

export const setConfirmState = ({ confirmToken }: ISetConfirmParams) => {
  localStorage.setItem(CONFIRM_TOKEN_KEY, confirmToken)
}

export const setAuthState = ({
  accessToken,
  refreshToken
}: ISetAuthStateParams) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const clearAuthState = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const clearConfirmState = (): void => {
  localStorage.removeItem(CONFIRM_TOKEN_KEY)
}
